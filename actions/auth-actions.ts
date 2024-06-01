"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/lib/user-service";
import { LoginSchema, RegisterSchema } from "@/schemas/authSchema";
import { signIn, signOut } from "@/lib/auth";
import { AuthError } from "next-auth";

export async function register(values: z.infer<typeof RegisterSchema>) {
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

export async function loginByCredentials(values: z.infer<typeof LoginSchema>) {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      error: "Invalid email or password",
    };
  }
  const { email, password } = validatedFields.data;
  try {
    await signIn("credentials", {
      email,
      password,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Invalid email or password",
          };
        default:
          return {
            error: "Something went wrong",
          };
      }
    }
    throw error;
  }
  return {
    success: "User created",
  };
}

export async function logout() {
  await signOut();
}
