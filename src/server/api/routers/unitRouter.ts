import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const unitRouter = createTRPCRouter({
  post: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        symbol: z.string(),
      })
    )
    .mutation(({ input, ctx: { prisma } }) => {
      return prisma.unit.create({
        data: {
          ...input,
        },
      });
    }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.unit.findMany();
  }),
});
