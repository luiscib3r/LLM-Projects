import prisma from './prisma';

export const getDefaultApiConfig = async () => prisma.config.findUnique({
  where: { environment: 'default' },
  select: {
    llmApi: true
  }
});

export const setDefaultLlmApi = async (apiId: string) => prisma.config.update({
  where: { environment: 'default' },
  data: {
    llmApiId: apiId
  }
});