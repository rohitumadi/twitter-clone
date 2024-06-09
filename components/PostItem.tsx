import { getUserById } from "@/lib/user-service";
import { Post } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import Avatar from "./Avatar";
import Image from "next/image";

interface PostItemProps {
  post: Post;
}

export default async function PostItem({ post }: PostItemProps) {
  const { userId } = post;
  const { user } = (await getUserById(userId)) || { user: null };
  const createdAt = formatDistanceToNow(post.createdAt);
  return (
    <div className="flex gap-3 p-4">
      <Avatar imageUrl={user?.profileImage as string} />
      <div className="flex flex-col">
        <div className="flex items-center gap-3">
          <p className="text-white capitalize">{user?.name}</p>
          <p className="text-muted-foreground">
            @{user?.username} • {createdAt}
          </p>
        </div>
        <div className="text-white text-sm my-1">{post.body}</div>
        {post.postImageUrl && (
          <div className="relative aspect-square w-full">
            <Image
              src={post.postImageUrl as string}
              alt="post image"
              className="object-cover rounded-md"
              fill
            />
          </div>
        )}
      </div>
    </div>
  );
}
