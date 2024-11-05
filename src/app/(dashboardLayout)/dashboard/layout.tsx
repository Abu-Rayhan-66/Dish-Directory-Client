import Navbar from "@/app/(commonLayout)/components/Navbar";
import type { Metadata } from "next";
import DashboardSidebar from "../DashboardSidebar";


export const metadata: Metadata = {
  title: "Dish Directory",
  description: "Next Level Riding Sharing Service",
};

export default function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <Navbar></Navbar>
        <DashboardSidebar></DashboardSidebar>
      {children}
    </div>
  );
}