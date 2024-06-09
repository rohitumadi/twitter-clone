import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async () => {
  try {
    const users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 6,
    });
    return users;
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    const followersCount = await db.user.count({
      where: {
        followingIds: {
          has: id,
        },
      },
    });
    // For testing
    // await new Promise((res) => setTimeout(res, 5000));
    return { user, followersCount };
  } catch (error) {
    console.log(error);
  }
};
