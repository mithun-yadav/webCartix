import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductsListing from "./components/productsLIsting/ProductsListing";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddToCart from "./components/addToCart/AddToCart";
import { Provider } from "react-redux";
import { store, persistor } from "./redux-toolkit/store";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/login/Login";
import ProtectedRoute from "./middleware/ProtectedRoute";

const queryClient = new QueryClient();
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          {/* <Cart /> */}
          <ToastContainer position="bottom-right" autoClose={2000} />
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <ProductsListing />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <AddToCart />
                  </ProtectedRoute>
                }
              />
              {/* <Route path="/products" element={<Products />} /> */}
              {/* <Route path="/products/:id" element={<div>Product Details</div>} /> */}
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
