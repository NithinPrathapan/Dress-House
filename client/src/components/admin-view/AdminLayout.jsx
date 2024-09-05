import React from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "./Header";
import AdminSidebar from "./Sidebar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen w-full">
      {/* sidebar */}
      <div className="flex flex-1 flex-col">
        {/* admin-header */}
        <main className="flex-1 flex bg-muted/40 p-4 md:p-6">
          <AdminSidebar />
          <AdminHeader />
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
