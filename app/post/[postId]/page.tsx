import CommentFeed from "@/components/CommentFeed";
import CommentForm from "@/components/CommentForm";
import Header from "@/components/Header";
import PostItem from "@/components/PostItem";
import { auth } from "@/lib/auth";
import { getPostById } from "@/lib/post-service";
import { getUserByEmail } from "@/lib/user-service";

export default async function PostPage({
  params,
}: {
  params: { postId: string };
}) {
  const { postId } = params;
  const session = await auth();
  const currentUserId = session?.user?.id;
  let currentUser;
  if (session) {
    currentUser = await getUserByEmail(session?.user?.email as string);
  }

  const post = await getPostById(postId);
  const comments = post?.comments;
  return (
    <>
      <Header label="Tweet" showBackArrow />
      {/* @ts-ignore */}

      <PostItem post={post} currentUserId={currentUserId} />
      {currentUser && <CommentForm postId={postId} currentUser={currentUser} />}
      {comments?.length && <CommentFeed comments={comments} />}
    </>
  );
}
