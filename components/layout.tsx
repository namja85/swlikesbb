import React from "react";
import { Inter } from "next/font/google";
import ScrollToTopButton from "./ScrollToTopButton";

const inter = Inter({ subsets: ["latin"] });

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const scrollToTop = () => window.scrollTo(0, 0);

  return (
    <>
      <header className="bg-gray-200 h-20 flex items-center shadow px-8">
        <h1 className="uppercase text-2xl font-bold">swlikesbb</h1>
      </header>
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
      >
        {children}
      </main>
      <ScrollToTopButton handleClick={scrollToTop} />
    </>
  );
}
