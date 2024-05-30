"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/lib/user-service";
import { RegisterSchema } from "@/schemas/authSchema";

async function register(values: z.infer<typeof RegisterSchema>) {
  console.log(values);
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid email or password",
    };
  }
  const { email, password, name, username, confirmPassword } =
    validatedFields.data;

  if (password !== confirmPassword) {
    return {
      error: "Passwords do not match",
    };
  }
  //check if email already exists
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return {
      error: "Email already exists",
    };
  }
  //encrypt password
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.user.create({
    data: {
      email,
      name,
      username,
      hashedPassword,
    },
  });

  return {
    success: "User created",
  };
}

export default register;
