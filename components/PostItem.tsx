"use client";
import { toggleLikePost } from "@/actions/user-actions";
import useLoginModal from "@/hooks/useLoginModal";
import { Post, User } from "@prisma/client";
import { formatDistanceToNowStrict } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiHeart, FiMessageCircle } from "react-icons/fi";
import Avatar from "./Avatar";

interface ExtendedPost extends Post {
  user: User;
  comments: Comment[];
}

interface PostItemProps {
  post: ExtendedPost;
  currentUserId: string;
}

export default function PostItem({ post, currentUserId }: PostItemProps) {
  const router = useRouter();
  const loginModal = useLoginModal();
  const user = post.user;
  const createdAt = formatDistanceToNowStrict(post.createdAt);
  const isLiked = post.likedIds.includes(currentUserId as string);
  const handleRedirectToPost = () => {
    router.push(`/post/${post.id}`);
  };
  const handleRedirectToUser = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/user/${user.id}`);
  };
  const handleLikePost = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentUserId) {
      loginModal.onOpen();
      return;
    }
    await toggleLikePost(post.id);
    router.refresh();
    isLiked ? toast.success("Post disliked") : toast.success("Post liked");
  };
  return (
    <div
      onClick={handleRedirectToPost}
      className="flex flex-col gap-3 p-3 hover:bg-neutral-800 cursor-pointer border-b-[1px] border-neutral-800"
    >
      <div className="flex  gap-3">
        <Avatar imageUrl={user?.profileImage as string} />

        <div className="flex items-center gap-3">
          <p
            onClick={handleRedirectToUser}
            className="text-white  capitalize text-xs sm:text-base hover:underline"
          >
            {user?.name}
          </p>
          <p className="text-muted-foreground truncate text-xs sm:text-base text-wrap">
            @{user?.username} • {createdAt}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="text-white text-sm text-wrap">{post.body}</div>
        {post.postImageUrl && (
          <div className="relative  aspect-square ">
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
              fill={isLiked ? "red" : ""}
              color={isLiked ? "red" : ""}
              className="hover:text-red-500 "
            />
            <p>{post.likedIds?.length || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
