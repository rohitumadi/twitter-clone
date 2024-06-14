"use client";
interface ErrorProps {
  error: Error;
  reset: () => void;
}
export default function Error({ error, reset }: ErrorProps) {
  return (
    <main className="flex justify-center items-center flex-col gap-6">
      <h1 className="text-3xl text-white font-semibold">
        Something went wrong!
      </h1>
      <p className="text-lg text-muted-foreground">{error.message}</p>
    </main>
  );
}
