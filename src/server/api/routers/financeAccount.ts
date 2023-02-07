import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const financeAccountRouter = createTRPCRouter({
  post: protectedProcedure
    .input(z.object({ name: z.string(), color: z.string() }))
    .mutation(
      ({
        input,
        ctx: {
          prisma,
          session: { user },
        },
      }) => {
        return prisma.financeAccount.create({
          data: {
            name: input.name,
            color: input.color,
            userId: user.id,
          },
        });
      }
    ),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.financeAccount.findMany();
  }),
  delete: protectedProcedure.input(z.string()).mutation(
    ({
      input,
      ctx: {
        prisma,
        session: { user },
      },
    }) => {
      return prisma.financeAccount.delete({
        where: {
          id: input,
        },
      });
    }
  ),
});
