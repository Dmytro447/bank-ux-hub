// tagRouter.ts
import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

export const tagRouter = router({
  list: protectedProcedure.query(({ ctx }) =>
    ctx.prisma.tag.findMany({ orderBy: { name: "asc" } })
  ),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(2) }))
    .mutation(({ ctx, input }) => ctx.prisma.tag.create({ data: input })),

  delete: protectedProcedure
    .input(z.string().cuid())
    .mutation(({ ctx, input }) =>
      ctx.prisma.tag.delete({ where: { id: input } })
    ),
});
