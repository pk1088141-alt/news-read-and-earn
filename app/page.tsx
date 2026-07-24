"use client";

import { useEffect, useState } from "react";

type NewsArticle = {
  title: string;
  description: string;
  content?: string;
  image?: string;
  url: string;
  source?: {
    name: string;
  };
  publishedAt: string;
};

const categories = [
  "general",
  "world",
  "nation",
  "business",
  "technology",
  "sports",
  "entertainment",
  "health",
  "science",
];

export default function HomePage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("general");

  async function loadNews(selectedCategory: string) {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`/api/news?category=${selectedCategory}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Unable to load news");
      }

      const data = await res.json();

      setArticles(data.articles || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch latest news.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNews(category);
  }, [category]);
