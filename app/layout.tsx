import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wan 2.1 Video Generator",
  description: "Serverless text-to-video generation powered by Wan 2.1 and Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-slate-950 text-slate-100">
        {children}
      </body>
    </html>
  );
}
