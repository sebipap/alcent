import { string, z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const transactionRouter = createTRPCRouter({
  post: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        amount: z.number().positive(),
        date: z.string(),
        financeAccountId: z.string(),
      })
    )
    .mutation(
      ({
        input,
        ctx: {
          prisma,
          session: { user },
        },
      }) => {
        return prisma.transaction.create({
          data: {
            userId: user.id,
            ...input,
          },
        });
      }
    ),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.transaction.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
  delete: protectedProcedure.input(z.string()).mutation(
    ({
      input,
      ctx: {
        prisma,
        session: { user },
      },
    }) => {
      return prisma.transaction.delete({
        where: {
          id: input,
        },
      });
    }
  ),
});
