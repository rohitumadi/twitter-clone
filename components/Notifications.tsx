import { getNotificationOfCurrentUser } from "@/lib/notifications-service";
import { BsTwitter } from "react-icons/bs";

export default async function Notifications() {
  const notifications = await getNotificationOfCurrentUser();

  if (notifications?.length === 0 || !notifications) {
    return (
      <div className="text-center p-6 text-muted-foreground">
        No Notifications
      </div>
    );
  }
  return (
    <div className="text-white">
      {notifications.map((notification) => (
        <div
          className="p-4 flex gap-4 border-b-[1px] border-neutral-800"
          key={notification.id}
        >
          <BsTwitter color="white" size={32} />
          {notification.body}
        </div>
      ))}
    </div>
  );
}
