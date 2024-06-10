"use client";
import { Post, User } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { FiHeart, FiMessageCircle } from "react-icons/fi";
import Avatar from "./Avatar";
import { useRouter } from "next/navigation";
import useLoginModal from "@/hooks/useLoginModal";
import { likePost } from "@/actions/user-actions";

interface ExtendedPost extends Post {
  user: User;
  comments: Comment[];
}

interface PostItemProps {
  post: ExtendedPost;
}

export default function PostItem({ post }: PostItemProps) {
  const router = useRouter();
  const loginModal = useLoginModal();
  const user = post.user;
  const createdAt = formatDistanceToNow(post.createdAt);
  // const isLiked = post.likedIds.includes(currentUserId as string);
  const handleRedirectToPost = () => {
    router.push(`/post/${post.id}`);
  };
  const handleRedirectToUser = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/user/${user.id}`);
  };
  const handleLikePost = async () => {
    // if (!currentUserId) {
    //   loginModal.onOpen();
    //   return;
    // }
    // await likePost(post.id);
  };
  return (
    <div
      onClick={handleRedirectToPost}
      className="flex gap-3 p-4 hover:bg-neutral-800 cursor-pointer border-b-[1px] border-neutral-800"
    >
      <Avatar imageUrl={user?.profileImage as string} />
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <p
            onClick={handleRedirectToUser}
            className="text-white capitalize hover:underline"
          >
            {user?.name}
          </p>
          <p className="text-muted-foreground">
            @{user?.username} • {createdAt}
          </p>
        </div>
        <div className="text-white text-sm ">{post.body}</div>
        {post.postImageUrl && (
          <div className="relative  aspect-square w-full">
            <Image
              src={post.postImageUrl as string}
              alt="post image"
              className="object-cover rounded-md"
              fill
            />
          </div>
        )}
        <div className="flex items-center gap-3">
          <div className="flex text-muted-foreground cursor-pointer items-center gap-2 ">
            <FiMessageCircle size={20} className="hover:text-sky-500" />
            <p>{post?.comments?.length || 0}</p>
          </div>
          <div className="flex text-muted-foreground cursor-pointer items-center gap-2 ">
            <FiHeart
              onClick={handleLikePost}
              size={20}
              // color={isLiked ? "red" : ""}
              className="hover:text-red-500"
            />
            <p>{post.likedIds?.length || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
