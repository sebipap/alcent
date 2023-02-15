import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const financeAccountRouter = createTRPCRouter({
  post: protectedProcedure
    .input(
      z.object({
        unitId: z.string(),
        type: z.string(),
        entityId: z.string(),
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
        return prisma.financeAccount.create({
          data: {
            userId: user.id,
            ...input,
          },
        });
      }
    ),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.financeAccount.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        Unit: true,
        Entity: true,
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
      return prisma.financeAccount.delete({
        where: {
          id: input,
        },
      });
    }
  ),
});
