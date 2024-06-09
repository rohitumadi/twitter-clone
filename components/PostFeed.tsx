import { getAllPosts } from "@/lib/post-service";
import PostItem from "./PostItem";

interface PostFeedProps {
  userId?: string;
}

export default async function PostFeed({ userId }: PostFeedProps) {
  const posts = await getAllPosts();

  return (
    <div className="">
      {posts?.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}
