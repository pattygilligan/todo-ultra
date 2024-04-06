import { z } from "zod";

export const TodoSchema = z.object({
  id: z.number(),
  text: z.string(),
  done: z.boolean(),
});

export type Todo = z.infer<typeof TodoSchema>;
