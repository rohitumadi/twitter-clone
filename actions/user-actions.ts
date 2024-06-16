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
  // revalidatePath("/");
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

export async function toggleLikePost(postId: string) {
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
  //send notification only on like event not on unlike event
  if (!likedIds.includes(userId)) {
    if (post.userId !== userId) {
      await db.notification.create({
        data: {
          userId: post.userId,
          body: "Someone liked your post",
        },
      });
      await db.user.update({
        where: {
          id: post.userId,
        },
        data: {
          hasNotification: true,
        },
      });
    }
  }
  return updatedPost;
}

export async function commentPost(postId: string, body: string) {
  const session = await auth();
  if (!session) {
    return {
      error: "Not logged in",
    };
  }
  const comment = await db.comment.create({
    data: {
      body,
      userId: session?.user?.id as string,
      postId,
    },
  });
  const post = await db.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (post?.userId !== session?.user?.id) {
    await db.notification.create({
      data: {
        userId: post?.userId as string,
        body: "Someone replied to your tweet",
      },
    });
    await db.user.update({
      where: {
        id: post?.userId,
      },
      data: {
        hasNotification: true,
      },
    });
  }

  revalidatePath(`/post/${postId}`);
  return comment;
}
