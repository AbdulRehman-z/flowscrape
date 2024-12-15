"use client"
import { QueryClientProvider as TanstackQueryClientProvider, QueryClient } from "@tanstack/react-query"
import { useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";



export default function QueryClientProvider({ children }: { children: React.ReactNode }) {

  const [queryClient] = useState(() => new QueryClient());

  return (
    <TanstackQueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </TanstackQueryClientProvider>
  );
}
