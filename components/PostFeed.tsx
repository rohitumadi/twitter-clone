import { getAllPosts, getAllPostsByUserId } from "@/lib/post-service";
import PostItem from "./PostItem";
import { auth } from "@/lib/auth";

interface PostFeedProps {
  userId?: string;
}
//userId is optional to get all posts if not provided
//if provided, get posts by userId
export default async function PostFeed({ userId }: PostFeedProps) {
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
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}
