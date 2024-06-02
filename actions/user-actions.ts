"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import * as z from "zod";
import { UpdateUserSchema } from "@/schemas/updateUserSchema";
import { getUserById } from "@/lib/user-service";

export async function updateUser(values: z.infer<typeof UpdateUserSchema>) {
  const validatedFields = UpdateUserSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
    };
  }
  const { name, username, bio } = values;
  const session = await auth();
  if (!session) {
    return {
      error: "Not logged in",
    };
  }
  try {
    await db.user.update({
      where: {
        id: session?.user?.id,
      },
      data: {
        name,
        username,
        bio,
      },
    });
  } catch (error) {
    return {
      error: "Something went wrong",
    };
  }
  return {
    success: "User updated",
  };
}

export async function fetchUserById(id: string) {
  console.log(id);
  const user = await getUserById(id);
  return user;
}
