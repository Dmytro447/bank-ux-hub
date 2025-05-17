import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

export const flowRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(3),
        steps: z
          .array(
            z.object({
              order: z.number().nonnegative(),
              title: z.string(),
              notes: z.string().optional(),
              image: z.string().url().nullable().optional(),
            })
          )
          .min(1),
      })
    )
    .mutation(({ ctx, input }) =>
      ctx.prisma.uXFlow.create({
        data: {
          title: input.title,
          authorId: ctx.userId ?? "guest",
          steps: { createMany: { data: input.steps } },
        },
        include: { steps: true },
      })
    ),
  getAll: protectedProcedure.query(({ ctx }) =>
    ctx.prisma.uXFlow.findMany({
      include: { steps: true },
      orderBy: { createdAt: "desc" },
    })
  ),
});
