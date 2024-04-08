import prisma from './prisma';

export const createLlmApi = prisma.lLMApi.create;

export const getLlmApi = prisma.lLMApi.findUnique;

export const getLlmApis = prisma.lLMApi.findMany;

export const updateLlmApi = prisma.lLMApi.update;

export const deleteLlmApi = prisma.lLMApi.delete;