import * as z from "zod";

export const threadValidation = z.object({
  thread: z
    .string()
    .min(3, { message: "must be at least 3 characters long" })
    .max(5000, { message: "must be at most 5000 characters long" }),
  accountId: z.string(),
});

export const commentValidation = z.object({
  thread: z
    .string()
    .min(3, { message: "must be at least 3 characters long" })
    .max(5000, { message: "must be at most 1000 characters long" }),
});
