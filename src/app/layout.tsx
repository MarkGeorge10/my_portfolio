import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ToastProvider from "../provider/ToastProvider"; // Import the ToastProvider
import { Analytics } from "@vercel/analytics/react"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: 'Mark Fahim | Senior Software Engineer & AI Specialist',
    description: 'Portfolio of Mark Fahim - Senior Software Engineer, AI Specialist, and Master\'s Student in AI',
  icons: ''
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <ToastProvider /> {/* Add ToastProvider here */}
      </body>
    </html>
  );
}
