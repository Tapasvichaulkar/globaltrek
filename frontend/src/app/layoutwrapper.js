"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/utils/navbar";
import Footer from "@/components/utils/footer";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const hideLayout = pathname === "/login" || pathname === "/signup"|| pathname === "/forgot-password";

  return (
    <>
      {!hideLayout && <Navbar />}
      <main>{children}</main>
      {!hideLayout && <Footer />}
    </>
  );
}
