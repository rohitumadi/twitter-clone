import { getAllPosts, getAllPostsByUserId } from "@/lib/post-service";
import PostItem from "./PostItem";

interface PostFeedProps {
  userId?: string;
  currentUserId: string;
}
//userId is optional to get all posts if not provided
//if provided, get posts by userId
export default async function PostFeed({
  userId,
  currentUserId,
}: PostFeedProps) {
  let posts;
  if (userId) {
    posts = await getAllPostsByUserId(userId);
  } else {
    posts = await getAllPosts();
  }

  return (
    <div className="">
      {posts?.map((post) => (
        // @ts-ignore
        <PostItem key={post.id} post={post} currentUserId={currentUserId} />
      ))}
      <p className="text-center text-muted-foreground">No more posts to show</p>
    </div>
  );
}
