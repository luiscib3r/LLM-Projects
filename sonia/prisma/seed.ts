import { ApiType, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const gpt3 = await prisma.lLMApi.upsert({
    where: { name: "GPT 3.5" },
    update: {},
    create: {
      name: "GPT 3.5",
      url: "https://api.openai.com/v1",
      model: "gpt-3.5-turbo",
      apiType: ApiType.OPENAI,
    },
  });

  await prisma.lLMApi.upsert({
    where: { name: "GPT 4" },
    update: {},
    create: {
      name: "GPT 4",
      url: "https://api.openai.com/v1",
      model: "gpt-4-0125-preview",
      apiType: ApiType.OPENAI,
    },
  });

  await prisma.lLMApi.upsert({
    where: { name: "Claude Opus" },
    update: {},
    create: {
      name: "Claude Opus",
      url: "https://api.anthropic.com",
      model: "claude-3-opus-20240229",
      apiType: ApiType.ANTHROPIC,
    },
  });

  await prisma.lLMApi.upsert({
    where: { name: "Claude Sonnet" },
    update: {},
    create: {
      name: "Claude Sonnet",
      url: "https://api.anthropic.com",
      model: "claude-3-sonnet-20240229",
      apiType: ApiType.ANTHROPIC,
    },
  });

  await prisma.lLMApi.upsert({
    where: { name: "Claude Haiku" },
    update: {},
    create: {
      name: "Claude Haiku",
      url: "https://api.anthropic.com",
      model: "claude-3-haiku-20240307",
      apiType: ApiType.ANTHROPIC,
    },
  });

  await prisma.lLMApi.upsert({
    where: { name: "Mixtral" },
    update: {},
    create: {
      name: "Mixtral",
      url: "https://api.together.xyz/v1",
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      apiType: ApiType.OPENAI,
    },
  });

  await prisma.lLMApi.upsert({
    where: { name: "Llama 13B" },
    update: {},
    create: {
      name: "Llama 13B",
      url: "https://api.together.xyz/v1",
      model: "meta-llama/Llama-2-13b-chat-hf",
      apiType: ApiType.OPENAI,
    },
  });

  await prisma.config.upsert({
    where: { environment: "default" },
    update: {},
    create: {
      environment: "default",
      llmApiId: gpt3.id,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
