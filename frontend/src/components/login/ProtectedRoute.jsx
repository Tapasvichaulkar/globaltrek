"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ allowedRoles, children }) {
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      // Not logged in → redirect to login
      router.push("/login");
      return;
    }

    if (!allowedRoles.includes(user.role)) {
      // Role not allowed → redirect to home or unauthorized page
      router.push("/"); 
    }
  }, [router]);

  return children;
}