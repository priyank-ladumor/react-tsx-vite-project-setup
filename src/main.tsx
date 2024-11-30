import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import Loading from "src/components/loader/loader";
import { CartProvider } from "src/stores/demo.context";

const App = lazy(() => import("src/App"));

const queryClient = new QueryClient();

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <Suspense fallback={<Loading />}>
            <App />
          </Suspense>
        </CartProvider>
      </QueryClientProvider>
    </StrictMode>
  );
} else {
  console.error('Root element not found in the DOM');
}
