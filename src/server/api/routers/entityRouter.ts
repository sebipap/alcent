import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const entityRouter = createTRPCRouter({
  post: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(({ input, ctx: { prisma } }) => {
      return prisma.entity.create({
        data: {
          ...input,
        },
      });
    }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.entity.findMany();
  }),
});
