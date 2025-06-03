import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Products from "./components/products/Products";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddToCart from "./components/addToCart/AddToCart";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <Cart /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/cart" element={<AddToCart />} />
          {/* <Route path="/products" element={<Products />} /> */}
          {/* <Route path="/products/:id" element={<div>Product Details</div>} /> */}
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
