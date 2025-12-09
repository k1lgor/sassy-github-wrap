import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sassy GitHub Wrap | AI Roast",
  description: "Get roasted by a futuristic AI analyzing your GitHub profile.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} antialiased min-h-screen selection:bg-neon-cyan selection:text-black`}
      >
        {children}
      </body>
    </html>
  );
}
