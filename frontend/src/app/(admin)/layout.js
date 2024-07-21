import { Inter } from "next/font/google";
import Header from "@/components/global/header";
import ProtectedRoute from "@/protected-route/protected-route";
import AdminHeader from "@/components/global/admin-header";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }) {
  return (
   <>
        <ProtectedRoute allowedRole='admin'>
        <AdminHeader/>
        <div className="h-16 w-full"></div>
        {children}
        </ProtectedRoute>
      </>
  );
}
