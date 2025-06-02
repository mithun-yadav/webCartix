import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1>webcratix</h1>
      {/* <Cart /> */}
      {/* <ProductCard /> */}
    </QueryClientProvider>
  );
}

export default App;
