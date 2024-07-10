"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import HomeContextProvider from "@/Context/HomeContext";
import ContextPlanProvider from "./ContextPlan";

const queryClient = new QueryClient();

interface RootProps {
  children: ReactNode;
}

const Root: React.FC<RootProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <HomeContextProvider>
        <ContextPlanProvider>{children}</ContextPlanProvider>
      </HomeContextProvider>
    </QueryClientProvider>
  );
};

export default Root;
