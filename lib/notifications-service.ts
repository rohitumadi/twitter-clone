import { auth } from "./auth";
import { db } from "./db";

export const getNotificationOfCurrentUser = async () => {
  const session = await auth();
  if (!session) {
    return {
      error: "Not logged in",
    };
  }

  const currentUserId = session?.user?.id;
  await db.user.update({
    where: {
      id: currentUserId,
    },
    data: {
      hasNotification: false,
    },
  });
  const notifications = await db.notification.findMany({
    where: {
      userId: currentUserId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return notifications;
};
