// src/server/routers/pattern.ts
import { z } from "zod";
// імпортуємо Platform як звичайний символ, щоб він був значенням
import { Platform } from "@prisma/client";
import { router, protectedProcedure } from "../trpc";

export const patternRouter = router({
  list: protectedProcedure
    .input(z.object({ q: z.string().optional() }).optional())
    .query(async ({ ctx, input }) =>
      ctx.prisma.uXPattern.findMany({
        where: input?.q
          ? { title: { contains: input.q, mode: "insensitive" } }
          : {},
        include: {
          category: true,
          tags: { include: { tag: true } },
        },
        orderBy: { createdAt: "desc" },
      })
    ),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(3),
        description: z.string().optional(), // може бути undefined
        platform: z.nativeEnum(Platform), // валідуємо значення enum
        categoryId: z.string().cuid(),
        tagIds: z.array(z.string().cuid()).optional(),
        screenshots: z.array(z.string().url()).min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // будуємо data із розумним пропуском undefined
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: any = {
        title: input.title,
        platform: input.platform,
        category: { connect: { id: input.categoryId } },
        screenshots: input.screenshots,
      };
      // додаємо description тільки якщо воно задане
      if (input.description) data.description = input.description;
      // додаємо теги тільки якщо є
      if (input.tagIds?.length) {
        data.tags = {
          createMany: {
            data: input.tagIds.map((tagId) => ({ tagId })),
            skipDuplicates: true,
          },
        };
      }
      return ctx.prisma.uXPattern.create({
        data,
        include: {
          category: true,
          tags: { include: { tag: true } },
        },
      });
    }),

  byId: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.uXPattern.findUnique({
        where: { id: input.id },
        include: {
          category: true,
          tags: { include: { tag: true } },
        },
      });
    }),
});
