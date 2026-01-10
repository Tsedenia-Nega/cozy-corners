
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";
import NavBar from "@/components/layout/NavBar";

export const metadata: Metadata = {
  title: "Cozy Corners",
  description: "A comfortable place to relax and unwind.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 

{  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-50">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
           <NavBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
