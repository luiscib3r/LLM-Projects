import { Role } from "@prisma/client";
import prisma from "./prisma";

export const saveUserMessage = async ({ chatId, content }: { chatId: string, content: string }) => {
  await prisma.message.create({
    data: {
      content: content,
      chatId: chatId,
      role: Role.USER
    }
  })
};

export const saveAssistantMessage = async ({ chatId, content }: { chatId: string, content: string }) => {
  await prisma.message.create({
    data: {
      content: content,
      chatId: chatId,
      role: Role.ASSISTANT,
    }
  })
}