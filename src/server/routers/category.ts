import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

export const categoryRouter = router({
  list: protectedProcedure.query(({ ctx }) =>
    ctx.prisma.category.findMany({
      orderBy: { name: "asc" },
    })
  ),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(2),
        description: z.string().optional(),
        iconUrl: z.string().url().optional(),
      })
    )
    .mutation(({ ctx, input }) => ctx.prisma.category.create({ data: input })),

  delete: protectedProcedure
    .input(z.string().cuid())
    .mutation(({ ctx, input }) =>
      ctx.prisma.category.delete({ where: { id: input } })
    ),
});
