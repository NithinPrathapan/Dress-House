import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AuthLayout from "./components/auth/AuthLayout";
import AdminLayout from "./components/admin-view/AdminLayout";
import Dashboard from "./pages/admin-view/Dashboard";
import Orders from "./pages/admin-view/Orders";
import Products from "./pages/admin-view/Products";
import Features from "./pages/admin-view/Features";
import ShoppingLayout from "./components/shopping-view/ShoppingLayout";
import NotFound from "./pages/Not-found/NotFound";
import Listing from "./pages/shopping-view/Listing";
import Checkout from "./pages/shopping-view/Checkout";
import AccountPage from "./pages/shopping-view/AccountPage";
import Home from "./pages/shopping-view/Home";
import CheckAuth from "./components/commen/checkAuth";
import UnAuth from "./pages/un-auth/UnAuth";
import { useSelector } from "react-redux";

const App = () => {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
        </Route>
        {/* admin routes */}
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="features" element={<Features />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="listing" element={<Listing />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="account" element={<AccountPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/unauth-page" element={<UnAuth />} />
      </Routes>
    </div>
  );
};

export default App;
