import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import Root from "../Context/Root";

const poppins = Poppins({
  weight: ["200", "300", "400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Finance-app",
  description: "Seu app de finanças",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${poppins.className}`}>
          <div className="w-full h-screen flex justify-center bg-whitePrimary">
            <div className="w-full bg-whitePrimary overflow-x-hidden">
              <Root>{children}</Root>
            </div>
          </div>
      </body>
    </html>
  );
}