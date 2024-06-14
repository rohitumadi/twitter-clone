import Link from "next/link";
import Avatar from "./Avatar";
import { Comment, User } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
interface ExtendedComment extends Comment {
  user: User;
}
interface CommentItemProps {
  comment: ExtendedComment;
}

export default function CommentItem({ comment }: CommentItemProps) {
  const user = comment?.user;
  const createdAt = formatDistanceToNow(comment.createdAt);

  return (
    <div className="p-4 gap-4 h-30  flex border-b-[1px] border-neutral-800">
      <Avatar imageUrl={user?.profileImage as string} />
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <Link
            href={`/user/${user?.id}`}
            className="text-white capitalize hover:underline"
          >
            {user?.name}
          </Link>
          <p className="text-muted-foreground">
            @{user?.username} • {createdAt}
          </p>
        </div>
        <div className="text-white text-sm ">{comment.body}</div>
      </div>
    </div>
  );
}
