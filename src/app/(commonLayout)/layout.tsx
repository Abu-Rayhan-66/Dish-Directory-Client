import type { Metadata } from "next";
import Navbar from "./components/Navbar";


export const metadata: Metadata = {
  title: "Apollo Gears",
  description: "Next Level Riding Sharing Service",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <Navbar></Navbar>
      {children}
    </div>
  );
}