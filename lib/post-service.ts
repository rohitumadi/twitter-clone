import { auth } from "./auth";
import { db } from "./db";

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
