import Header from "@/components/Header";
import PostFeed from "@/components/PostFeed";
import UserBio from "@/components/UserBio";
import UserHero from "@/components/UserHero";
import { auth } from "@/lib/auth";
import { getUserById } from "@/lib/user-service";
import { User } from "@prisma/client";

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
      <PostFeed userId={userId} />
    </>
  );
}
