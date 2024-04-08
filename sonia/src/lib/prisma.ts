import { PrismaClient } from "@prisma/client";

declare const global: {
  prisma: PrismaClient;
};

let prisma: PrismaClient;

if (global.prisma) {
  prisma = global.prisma;
} else {
  prisma = new PrismaClient();
  global.prisma = prisma;
}

export default prisma;
