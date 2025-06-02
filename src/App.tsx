import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Products from "./components/products/Products";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./components/cart/Cart";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <Cart /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          {/* <Route path="/products" element={<Products />} /> */}
          {/* <Route path="/products/:id" element={<div>Product Details</div>} /> */}
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
