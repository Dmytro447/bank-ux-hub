import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import { prisma } from "./db";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    if (error.cause instanceof ZodError) {
      return {
        ...shape,
        data: { ...shape.data, zodError: error.cause.flatten() },
      };
    }
    return shape;
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;

export type Context = {
  prisma: typeof prisma;
  user?: { id: string; role: "ADMIN" | "EDITOR" | "VIEWER" };
};

export const createContext = async (): Promise<Context> => ({
  prisma,
});
