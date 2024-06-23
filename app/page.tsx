import Header from "@/components/Header";
import PostFeed from "@/components/PostFeed";
import PostForm from "@/components/PostForm";
import Spinner from "@/components/Spinner";
import WelcomeForm from "@/components/WelcomeForm";
import { auth } from "@/lib/auth";
import { getUserByEmail } from "@/lib/user-service";
import { User } from "@prisma/client";
import { Suspense } from "react";

export default async function Home() {
  const session = await auth();
  let currentUser;
  if (session) {
    currentUser = await getUserByEmail(session?.user?.email as string);
  }
  return (
    <>
      <Header label="Home" />
      {session?.user ? (
        <PostForm currentUser={currentUser as User} />
      ) : (
        <WelcomeForm />
      )}
      <Suspense fallback={<Spinner />}>
        <PostFeed currentUserId={currentUser?.id as string} />
      </Suspense>
    </>
  );
}
