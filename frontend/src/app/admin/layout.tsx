"use client";
import { verify } from "jsonwebtoken";
import AdminAuthGuard from "@/components/AdminAuthGuard";
import { useState, useEffect } from "react";

// Auth check function
function checkAdminAuth() {
  if (typeof window === "undefined") return false;
  const token = localStorage.getItem("token");
  console.log("token", token);

  if (!token) {
    return false;
  }

  try {
    // Verify JWT token (replace with your actual secret)
    const decoded = verify(token, process.env.JWT_SECRET || "your-secret-key");

    // Check if user has admin role
    if (decoded && typeof decoded === "object" && "role" in decoded) {
      return decoded.role === "admin";
    }

    return true;
  } catch (error) {
    console.error("Token verification failed:", error);
    return false;
  }
}

import { useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const authorized = true;
    console.log("authorized", authorized);

    setIsAuthorized(authorized);
    if (!authorized) {
      router.replace("/");
    }
  }, [router]);

  if (isAuthorized === null) {
    // Optionally show a loading spinner here
    return null;
  }

  if (!isAuthorized) {
    return null;
  }

  return (
    // <AdminAuthGuard>
      <div className="admin-layout">

        {/* Admin content area */}
        <main className="min-h-screen bg-gray-100">
          <div className="container mx-auto p-6">{children}</div>
        </main>
      </div>
    // </AdminAuthGuard>
  );
}
