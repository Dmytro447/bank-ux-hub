import { router } from "../trpc";
import { patternRouter } from "./pattern";
import { flowRouter } from "./flow";

export const appRouter = router({
  pattern: patternRouter,
  flow: flowRouter,
  category: patternRouter,
  tag: patternRouter,
});

export type AppRouter = typeof appRouter;
