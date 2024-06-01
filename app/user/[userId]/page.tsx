import Header from "@/components/Header";
import UserHero from "@/components/UserHero";
import { getUserById } from "@/lib/user-service";
import { User } from "@prisma/client";

interface UserPageProps {
  params: {
    userId: string;
  };
}

export default async function UserPage({ params }: UserPageProps) {
  const { userId } = params;
  const data = await getUserById(userId);

  return (
    <>
      <Header showBackArrow label={data?.user?.name || "User not found"} />
      <UserHero user={data?.user as User} />
    </>
  );
}
