"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import HomeContextProvider from "@/Context/HomeContext";

const queryClient = new QueryClient();

interface RootProps {
  children: ReactNode;
}

const Root: React.FC<RootProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <HomeContextProvider>{children}</HomeContextProvider>
    </QueryClientProvider>
  );
};

export default Root;
