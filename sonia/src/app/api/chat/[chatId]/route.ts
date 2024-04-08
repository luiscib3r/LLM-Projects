import { callChain } from "@/lib/langchain";
import { saveUserMessage } from "@/lib/message";
import { Message, StreamingTextResponse } from "ai";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

type RequestContext = {
  params: {
    chatId: string;
  };
}

export async function POST(req: NextRequest, context: RequestContext) {
  // Get path params
  const chatId = context.params.chatId;
  const body = await req.json();
  const messages = body.messages as Message[];
  const history = messages.slice(0, -1)
  const input = messages[messages.length - 1];

  await saveUserMessage({ chatId, content: input.content });

  revalidatePath(`/chat/${chatId}`);

  const stream = await callChain({
    chatId,
    input,
    history,
  });

  return new StreamingTextResponse(stream);
}