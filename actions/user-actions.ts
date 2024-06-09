"use server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { utapi } from "@/lib/uploadthing";
import { UpdateUserSchema } from "@/schemas/updateUserSchema";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export async function updateUser(values: z.infer<typeof UpdateUserSchema>) {
  const validatedFields = UpdateUserSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
    };
  }
  const { name, username, bio, profileImageUrl, coverImageUrl } = values;
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
        profileImage: profileImageUrl,
        coverImage: coverImageUrl,
      },
    });
    revalidatePath(`/user/${session?.user?.id}`);
  } catch (error) {
    return {
      error: "Something went wrong",
    };
  }
  return {
    success: "User updated",
  };
}

export async function uploadImage(image: FormData, imageName: string) {
  return await utapi.uploadFiles(image.get(imageName) as File);
}

export async function createPost(body: string, postImageUrl?: string) {
  const session = await auth();
  if (!session) {
    return {
      error: "Not logged in",
    };
  }

  const post = await db.post.create({
    data: {
      userId: session?.user?.id as string,
      postImageUrl,
      body,
    },
  });
}

export async function getAllPosts() {
  const posts = await db.post.findMany({
    include: {
      user: true,
      comments: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return posts;
}

export async function getAllPostsOfCurrentUser() {
  const session = await auth();
  if (!session) {
    return {
      error: "Not logged in",
    };
  }
  const posts = await db.post.findMany({
    where: {
      userId: session?.user?.id,
    },
    include: {
      user: true,
      comments: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return posts;
}
