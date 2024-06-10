import Header from "@/components/Header";
import PostForm from "@/components/PostForm";
import PostItem from "@/components/PostItem";
import { auth } from "@/lib/auth";
import { getPostById } from "@/lib/post-service";
import { getUserByEmail } from "@/lib/user-service";
import { User } from "@prisma/client";

export default async function PostPage({
  params,
}: {
  params: { postId: string };
}) {
  const { postId } = params;
  const session = await auth();
  let currentUser;
  if (session) {
    currentUser = await getUserByEmail(session?.user?.email as string);
  }

  const post = await getPostById(postId);
  return (
    <>
      <Header label="Tweet" showBackArrow />
      {/* @ts-ignore */}

      <PostItem post={post} />
      {/* <PostForm
        placeholder="Tweet your reply"
        currentUser={currentUser as User}
      /> */}
    </>
  );
}
