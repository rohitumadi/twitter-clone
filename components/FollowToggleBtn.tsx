import { followUser } from "@/actions/user-actions";
import { Button } from "./ui/button";

interface FollowToggleBtnProps {
  isFollowing: boolean;
  userId: string;
}

export default function FollowToggleBtn({
  isFollowing,
  userId,
}: FollowToggleBtnProps) {
  const toggleFollow = followUser.bind(null, userId);
  return (
    <form action={toggleFollow}>
      <Button
        variant={"secondary"}
        className={`bg-white ${
          isFollowing ? "bg-transparent border text-white" : "text-black"
        } rounded-full hover:text-black`}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
    </form>
  );
}
