import prisma from './prisma';

export const createChat = async (data = { title: "Untitled" }) => prisma.chat.create({ data })

export const getChats = async () => prisma.chat.findMany({
  orderBy: {
    createdAt: 'desc'
  }
})

export const getChat = async (id: string) => prisma.chat.findUnique({
  where: { id },
  select: {
    id: true,
    messages: {
      orderBy: {
        createdAt: 'desc'
      },
    },
  }
});

export const updateChat = async (data: { id: string, title: string }) => prisma.chat.update({
  where: { id: data.id },
  data
});

export const deleteChat = async (id: string) => prisma.chat.delete({
  where: { id }
});