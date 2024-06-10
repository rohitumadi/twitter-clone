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

export async function getAllPostsByUserId(userId: string) {
  const posts = await db.post.findMany({
    where: {
      userId: userId,
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

export async function getPostById(id: string) {
  const post = await db.post.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
      comments: {
        include: {
          user: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  return post;
}
