import { GNewsResponse } from "@/types/news";

const API_URL = "https://gnews.io/api/v4/top-headlines";

export async function getTopNews(category = "general") {
  const apiKey = process.env.GNEWS_API_KEY;

  if (!apiKey) {
    throw new Error("Missing GNEWS_API_KEY");
  }

  const url =
    `${API_URL}?category=${category}` +
    `&lang=en` +
    `&country=in` +
    `&max=10` +
    `&apikey=${apiKey}`;

  const response = await fetch(url, {
    next: {
      revalidate: 300,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch GNews");
  }

  return (await response.json()) as GNewsResponse;
}
