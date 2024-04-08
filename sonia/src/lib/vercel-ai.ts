import { Message, Role } from "@prisma/client";
import { Message as VercelMessage } from "ai";

export const mapRole = (role: Role) => {
  switch (role) {
    case Role.USER:
      return "user";
    case Role.ASSISTANT:
      return "assistant";
  }
};

export const mapMessage = (message: Message): VercelMessage => {
  return {
    id: message.id,
    content: message.content,
    role: mapRole(message.role),
    createdAt: message.createdAt,
  };
}

export const mapMessages = (messages: Message[]): VercelMessage[] => {
  return messages.map((message) => mapMessage(message));
};

export const mapVercelRole = (role: string) => {
  switch (role) {
    case "user":
      return Role.USER;
    case "assistant":
      return Role.ASSISTANT;
  }

  return Role.USER;
}