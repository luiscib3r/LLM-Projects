import { ChatAnthropic } from "@langchain/anthropic";
import { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { BytesOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { ApiType } from "@prisma/client";
import { Message } from "ai";
import { getDefaultApiConfig } from "./config";
import { saveAssistantMessage } from "./message";

export const getLlm = async (): Promise<BaseChatModel> => {
  const config = await getDefaultApiConfig();

  if (config == null) {
    throw new Error("No default API configuration found");
  }

  if (config.llmApi.apiType == ApiType.ANTHROPIC) {
    return new ChatAnthropic({
      anthropicApiKey: config.llmApi.apiKey ?? undefined,
      anthropicApiUrl: config.llmApi.url,
      modelName: config.llmApi.model,
      streaming: true,
      clientOptions: {
        baseURL: config.llmApi.url,
      },
    });
  }

  if (config.llmApi.apiType == ApiType.OPENAI) {
    return new ChatOpenAI({
      openAIApiKey: config.llmApi.apiKey ?? undefined,
      modelName: config.llmApi.model,
      streaming: true,
      configuration: {
        baseURL: config.llmApi.url,
      },
    });
  }

  throw new Error(`Unknown API type ${config.llmApi.apiType}`);
};

const TEMPLATE = `
You are an AI Assistant named Sonia.

Current conversation:
{chat_history}

User: {input}
AI:`;

export const getChain = async () => {
  const llm = await getLlm();

  const prompt = ChatPromptTemplate.fromTemplate(TEMPLATE);

  const outputParser = new BytesOutputParser();

  return prompt.pipe(llm).pipe(outputParser);
};

type CallChainParams = {
  chatId: string;
  input: Message;
  history: Message[];
};

const formatMessage = (message: Message) => {
  return `${message.role}: ${message.content}`;
};

export const callChain = async ({
  chatId,
  input,
  history,
}: CallChainParams) => {
  const chain = await getChain();
  const formattedHistory = history.map(formatMessage);

  const stream = await chain.stream(
    {
      chat_history: formattedHistory.join("\n"),
      input: input.content,
    },
    {
      callbacks: [
        {
          handleLLMEnd(result) {
            const content = result.generations[0][0].text;

            saveAssistantMessage({ chatId, content });
          },
        },
      ],
    }
  );

  return stream;
};
