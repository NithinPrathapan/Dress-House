import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AuthLayout from "./components/auth/AuthLayout";
import AdminLayout from "./components/admin-view/AdminLayout";

const App = () => {
  console.log("hello");
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
        </Route>
        <Route path="/admin" element={<AdminLayout />}></Route>
      </Routes>
    </div>
  );
};

export default App;
