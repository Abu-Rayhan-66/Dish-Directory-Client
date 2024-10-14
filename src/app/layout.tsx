import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/Providers";
import { Toaster } from "sonner";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Radhuni",
  description:
    "Welcome to Radhuni –",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en" data-theme="light">
      <body className={roboto.className}>
        <div className="">{children} <Toaster></Toaster> </div>
      </body>
    </html>
    </Providers>
  );
}
