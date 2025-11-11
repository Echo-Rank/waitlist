import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geist = localFont({
  src: [
    {
      path: "../public/fonts/Geist-Thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/Geist-ExtraLight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/Geist-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Geist-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Geist-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Geist-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/Geist-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Geist-ExtraBold.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/Geist-Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "Echo",
  description: "Rank, Rate, Relisten.",
  icons: {
    icon: "/Echo.png",
    apple: "/Echo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={geist.className}>{children}</body>
    </html>
  );
}
