import type { Metadata } from "next";
import "./globals.css";
import "./globals.css";

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
export const metadata: Metadata = {
  title: "NewsCash - Read News & Earn",
  description: "Read news, earn coins, and redeem rewards.",
  keywords: [
    "News",
    "GNews",
    "Earn",
    "Coins",
    "Paytm",
    "NewsCash"
  ],
  applicationName: "NewsCash",
  authors: [{ name: "NewsCash" }],
  creator: "NewsCash",
  publisher: "NewsCash",
  themeColor: "#2563eb",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1
  },
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
