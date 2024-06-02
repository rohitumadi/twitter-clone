import * as z from "zod";

export const UpdateUserSchema = z.object({
  name: z.string().max(50, { message: "Name must be less than 50 characters" }),
  username: z
    .string()
    .max(50, { message: "Username must be less than 50 characters" }),
  bio: z.string().max(200, { message: "Bio must be less than 200 characters" }),
});
