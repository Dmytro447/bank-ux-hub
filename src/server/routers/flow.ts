import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const flowRouter = router({
  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(3),
        steps: z
          .array(
            z.object({
              order: z.number().nonnegative(),
              title: z.string(),
              notes: z.string().optional(),
              image: z.string().url().optional(),
            })
          )
          .min(1),
      })
    )
    .mutation(({ ctx, input }) =>
      ctx.prisma.uXFlow.create({
        data: {
          title: input.title,
          authorId: ctx.user?.id ?? "guest",
          steps: { createMany: { data: input.steps } },
        },
        include: { steps: true },
      })
    ),
});
