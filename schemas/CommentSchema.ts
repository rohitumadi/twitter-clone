import * as z from "zod";

export const CommentSchema = z.object({
  body: z
    .string()
    .min(1, { message: "Comment text is required" })
    .max(200, { message: "Comment must be less than 200 characters" }),
});
