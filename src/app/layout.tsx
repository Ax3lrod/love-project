import type { Metadata } from "next";
//import { Geist, Geist_Mono } from "next/font/google";
import { Tinos } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const tinos = Tinos({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-tinos",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${tinos.variable} antialiased`}>{children}</body>
    </html>
  );
}
