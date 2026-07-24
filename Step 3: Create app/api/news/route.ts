import { NextResponse } from "next/server";
import { getTopNews } from "@/lib/gnews";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const category =
      searchParams.get("category") ?? "general";

    const news = await getTopNews(category);

    return NextResponse.json(news);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Unable to load news" },
      { status: 500 }
    );
  }
}
