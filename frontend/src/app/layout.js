import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/global/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Book Haven",
  description: "Books store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        </body>
    </html>
  );
}
