import "./globals.css";
import { Inter } from "next/font/google";
import ThemeProvider from "@/components/layout/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "سوال‌پیچ",
  description: "پلتفرم طراحی و پاسخ به سوالات",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
