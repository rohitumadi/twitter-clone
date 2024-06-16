import { getAllUsers } from "@/lib/user-service";
import FollowUser from "./FollowUser";
import { auth } from "@/lib/auth";

export default async function FollowBar() {
  let users = await getAllUsers();
  if (!users) return null;
  const session = await auth();
  users = users.filter((user) => user.id !== session?.user?.id);
  return (
    <div className=" hidden sticky top-0 lg:block px-6 py-4">
      <div className="bg-neutral-800 p-4 rounded-xl">
        <h2 className=" text-xl font-bold text-white">Who to follow</h2>
        <div className="flex flex-col gap-5 mt-4">
          {users.map((user) => (
            <FollowUser key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}
