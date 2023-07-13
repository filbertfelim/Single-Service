import { PrismaClient } from "@prisma/client";
import { env } from "~/env.mjs";

// This is a helper function that instantiates Prisma
const instantiatePrisma = () =>
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? instantiatePrisma();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
