import { ApiType, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const openai = await prisma.lLMApi.upsert({
    where: { name: 'OpenAI' },
    update: {},
    create: {
      name: 'OpenAI',
      url: 'https://api.openai.com',
      model: 'gpt-3.5-turbo',
      apiType: ApiType.OPENAI,
    },
  })

  await prisma.lLMApi.upsert({
    where: { name: 'Anthropic' },
    update: {},
    create: {
      name: 'Anthropic',
      url: 'https://api.anthropic.com',
      model: 'claude-3-opus',
      apiType: ApiType.ANTHROPIC,
    },
  })

  await prisma.config.upsert({
    where: { environment: 'default' },
    update: {},
    create: {
      environment: 'default',
      llmApiId: openai.id,
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })