import Header from "@/components/Header/Header";
import "./globals.css";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import React from "react";
import { Metadata } from "next";
import { Roboto } from "next/font/google";

interface RootLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export const metadata: Metadata = {
  title: "NoteHub",
  description:
    "A simple and efficient app for creating and organizing your notes.",
  openGraph: {
    title: "NoteHub",
    description:
      "A simple and efficient app for creating and organizing your notes.",
    url: "https://notehub.com/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub - A simple and efficient app for creating and organizing your notes.",
      },
    ],
  },
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <Header />
          {children}
          {modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
