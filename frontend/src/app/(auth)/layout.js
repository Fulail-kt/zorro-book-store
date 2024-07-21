import { Inter } from "next/font/google";
import Header from "@/components/global/header";
import ProtectedRoute from "@/protected-route/protected-route";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }) {
  return (
    <>
        <Header/>
        <div className="h-16 w-full"></div>
        {children}
    </>
  );
}
