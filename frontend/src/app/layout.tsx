import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/Providers";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { AuthPopupProvider } from "@/contexts/AuthPopupContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Health Academy - Professional Healthcare Education",
  description:
    "Empowering healthcare professionals with best-in-class education and training programs.",
  keywords:
    "healthcare education, medical training, professional development, certificates",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AuthPopupProvider>
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster position="top-right" />
          </AuthPopupProvider>
        </Providers>
      </body>
    </html>
  );
}
