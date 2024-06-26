import Header from "@/components/Header";
import PostFeed from "@/components/PostFeed";
import Spinner from "@/components/Spinner";
import UserBio from "@/components/UserBio";
import UserHero from "@/components/UserHero";
import { auth } from "@/lib/auth";
import { getUserById } from "@/lib/user-service";
import { User } from "@prisma/client";
import { Suspense } from "react";

export async function generateMetadata({ params }: UserPageProps) {
  const { userId } = params;
  const data = await getUserById(userId);
  let user;
  if (data?.user) {
    user = data?.user;
  }
  return {
    title:
      `${user?.name?.toUpperCase()} (@${user?.username})` || "User not found",
  };
}

interface UserPageProps {
  params: {
    userId: string;
  };
}

export default async function UserPage({ params }: UserPageProps) {
  const { userId } = params;
  const session = await auth();
  const currentUserId = session?.user?.id;
  const data = await getUserById(userId);
  let currentUser;
  if (currentUserId) {
    const data = await getUserById(currentUserId);
    currentUser = data?.user;
  }

  return (
    <>
      <Header showBackArrow label={data?.user?.name || "User not found"} />
      <UserHero user={data?.user as User} />

      <UserBio
        currentUser={currentUser as User}
        user={data?.user as User}
        followersCount={data?.followersCount as number}
      />
      <Suspense fallback={<Spinner />}>
        <PostFeed userId={userId} currentUserId={currentUserId as string} />
      </Suspense>
    </>
  );
}
