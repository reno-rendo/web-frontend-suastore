import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { QueryProvider } from "@/lib/hooks";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "SuaStore - Belanja Mudah, Aman & Terpercaya",
    template: "%s | SuaStore",
  },
  description:
    "SuaStore adalah marketplace e-commerce terpercaya dengan jutaan produk berkualitas. Belanja mudah dengan pengiriman cepat dan pembayaran aman.",
  keywords: [
    "ecommerce",
    "marketplace",
    "belanja online",
    "toko online",
    "suastore",
  ],
  authors: [{ name: "SuaStore" }],
  creator: "SuaStore",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://suastore.id",
    siteName: "SuaStore",
    title: "SuaStore - Belanja Mudah, Aman & Terpercaya",
    description:
      "Marketplace e-commerce terpercaya dengan jutaan produk berkualitas.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SuaStore - Belanja Mudah, Aman & Terpercaya",
    description:
      "Marketplace e-commerce terpercaya dengan jutaan produk berkualitas.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-sans antialiased">
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <div className="relative min-h-screen flex flex-col">
              {children}
            </div>
            <Toaster
              position="top-right"
              richColors
              closeButton
              toastOptions={{
                duration: 4000,
              }}
            />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

