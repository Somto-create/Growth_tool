import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import Providers from "./providers";
import "./globals.css";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree" });

export const metadata: Metadata = {
  title: "Promo Tool",
  description: "Promotions management tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={figtree.variable}>
      <body style={{ margin: 0, minHeight: "100vh" }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
