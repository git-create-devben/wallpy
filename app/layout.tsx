import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./Header";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wallpy",
  description: "Download wallpaper easily",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" data-theme="dark">
        <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        </head>
        <body className={inter.className} style={{ paddingTop: "1rem" }}>
          <Header />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
