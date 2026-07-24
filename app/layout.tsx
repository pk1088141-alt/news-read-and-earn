import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "News Read & Earn",
  description: "Read news and earn rewards",
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
