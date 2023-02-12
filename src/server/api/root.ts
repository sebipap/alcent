import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { financeAccountRouter } from "./routers/financeAccount";
import { entityRouter } from "./routers/entityRouter";
import { transactionRouter } from "./routers/transactionRouter";
import { unitRouter } from "./routers/unitRouter";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  financeAccount: financeAccountRouter,
  entity: entityRouter,
  unit: unitRouter,
  transaction: transactionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
