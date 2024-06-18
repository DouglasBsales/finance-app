import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import HomeContextProvider from "@/Context/HomeContextProvider";
import Menu from "@/components/MenuGlobal/Menu";

const montSerrat = Montserrat({
  weight: ["200", "300", "400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Finance-app",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${montSerrat.className} m-0 p-0 h-screen bg-whitePrimary flex items-center justify-center`}
      >
        <HomeContextProvider>
          <div className="w-[390px] bg-whitePrimary overflow-auto">
            {children}
            <Menu />
          </div>
        </HomeContextProvider>
      </body>
    </html>
  );
}
