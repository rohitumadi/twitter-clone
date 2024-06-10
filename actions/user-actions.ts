"use server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { utapi } from "@/lib/uploadthing";
import { UpdateUserSchema } from "@/schemas/updateUserSchema";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export async function updateUser(
  values: z.infer<typeof UpdateUserSchema>,
  profileImageUrl?: string,
  coverImageUrl?: string
) {
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
  revalidatePath("/");
}

export async function followUser(userId: string) {
  const session = await auth();
  if (!session) {
    return {
      error: "Not logged in",
    };
  }
  const user = await db.user.findUnique({
    where: {
      id: session?.user?.id,
    },
  });
  const updatedFollowingIds = user?.followingIds?.includes(userId)
    ? user?.followingIds?.filter((id) => id !== userId)
    : [...(user?.followingIds || []), userId];

  const updatedUser = await db.user.update({
    where: {
      id: session?.user?.id,
    },
    data: {
      followingIds: updatedFollowingIds,
    },
  });

  revalidatePath(`/user/${userId}`);
  return updatedUser;
}

export async function likePost(postId: string) {
  const session = await auth();
  if (!session) {
    return {
      error: "Not logged in",
    };
  }

  const post = await db.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    return {
      error: "Post not found",
    };
  }
  // Ensure all elements in likedIds are strings
  const likedIds: string[] = post?.likedIds || [];
  const userId = session.user?.id as string;

  // Toggle like
  const updatedLikes = likedIds.includes(userId)
    ? likedIds.filter((id) => id !== userId)
    : [...likedIds, userId];

  const updatedPost = await db.post.update({
    where: {
      id: postId,
    },
    data: {
      likedIds: updatedLikes,
    },
  });
  revalidatePath(`/post/${postId}`);
  return updatedPost;
}

export async function unlikePost(postId: string) {}
