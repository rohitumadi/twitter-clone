import { getAllPostsByUserId } from "@/lib/post-service";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || 1;
  const pageSize = searchParams.get("pageSize") || 10;
  try {
    const data = await getAllPostsByUserId(
      userId,
      Number(page),
      Number(pageSize)
    );
    // For testing
    // await new Promise((res) => setTimeout(res, 5000));
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }
  }
}
