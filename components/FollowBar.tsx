export default function FollowBar() {
  return (
    <div className=" hidden lg:block px-6 py-4">
      <div className="bg-neutral-800 p-4 rounded-xl">
        <h2 className=" text-xl font-bold text-white">Who to follow</h2>
        <div className="flex flex-col gap-5 mt-4">{/* TODO USER LIST */}</div>
      </div>
    </div>
  );
}
