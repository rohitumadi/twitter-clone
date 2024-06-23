import { db } from "./db";

// export async function getAllPosts(page = 1, pageSize = 10) {
//   const skip = (page - 1) * pageSize;
//   const take = pageSize;

//   const posts = await db.post.findMany({
//     skip: skip,
//     take: take,
//     include: {
//       user: true,
//       comments: true,
//     },
//     orderBy: {
//       createdAt: "desc",
//     },
//   });

//   const totalPosts = await db.post.count();

//   return {
//     posts,
//     totalPosts,
//     totalPages: Math.ceil(totalPosts / pageSize),
//     currentPage: page,
//   };
// }

// export async function getAllPostsByUserId(
//   userId: string,
//   page = 1,
//   pageSize = 10
// ) {
//   const skip = (page - 1) * pageSize;
//   const take = pageSize;

//   const posts = await db.post.findMany({
//     where: {
//       userId: userId,
//     },
//     skip: skip,
//     take: take,
//     include: {
//       user: true,
//       comments: true,
//     },
//     orderBy: {
//       createdAt: "desc",
//     },
//   });

//   const totalPosts = await db.post.count({
//     where: {
//       userId: userId,
//     },
//   });

//   return {
//     posts,
//     totalPosts,
//     totalPages: Math.ceil(totalPosts / pageSize),
//     currentPage: page,
//   };
// }

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
  // For testing
  // await new Promise((res) => setTimeout(res, 5000));
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
  // For testing
  // await new Promise((res) => setTimeout(res, 5000));
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
