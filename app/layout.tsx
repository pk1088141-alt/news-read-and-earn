import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NewsCash",
  description: "Read News & Earn",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
