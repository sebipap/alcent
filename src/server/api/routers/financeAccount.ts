import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const financeAccountRouter = createTRPCRouter({
  post: protectedProcedure.input(z.object({ name: z.string() })).mutation(
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
          userId: user.id,
        },
      });
    }
  ),
});
