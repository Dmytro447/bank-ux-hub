// import { initTRPC } from "@trpc/server";
// import superjson from "superjson";
// import { ZodError } from "zod";
// import { prisma } from "./db";

// const t = initTRPC.context<Context>().create({
//   transformer: superjson,
//   errorFormatter({ shape, error }) {
//     if (error.cause instanceof ZodError) {
//       return {
//         ...shape,
//         data: { ...shape.data, zodError: error.cause.flatten() },
//       };
//     }
//     return shape;
//   },
// });

// export const router = t.router;
// export const publicProcedure = t.procedure;

// export type Context = {
//   prisma: typeof prisma;
//   user?: { id: string; role: "ADMIN" | "EDITOR" | "VIEWER" };
// };

// export const createContext = async (): Promise<Context> => ({
//   prisma,
// });

// utils/trpc.ts
import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { prisma } from "./db";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

export type Context = { prisma: typeof prisma; userId?: string };

export async function createContext(
  opts: FetchCreateContextFnOptions
): Promise<Context> {
  // opts.req is a Web Request
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { userId } = getAuth(opts.req as any);

  if (userId) {
    // ① call the function…
    console.log("userId", userId);
    const clerk = await clerkClient();
    // ② …then use .users on the returned client
    const clerkUser = await clerk.users.getUser(userId);

    const primary = clerkUser.emailAddresses.find(
      (e) => e.id === clerkUser.primaryEmailAddressId
    );
    const email = primary?.emailAddress ?? "";

    await prisma.user.upsert({
      where: { clerkId: userId },
      update: { email },
      create: { clerkId: userId, email },
    });
  }
  return { prisma, userId: userId ?? undefined };
}

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    if (error.cause instanceof ZodError) {
      return {
        ...shape,
        data: {
          ...shape.data,
          zodError: error.cause.flatten(),
        },
      };
    }
    return shape;
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.userId) {
    throw new Error("Unauthorized");
  }
  return next({
    ctx: {
      ...ctx,
      userId: ctx.userId,
    },
  });
});
