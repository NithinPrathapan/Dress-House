import React, { Fragment } from "react";
import {
  ChartNoAxesCombined,
  LayoutDashboard,
  ShoppingBasket,
  BadgeCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const AdminSidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const adminSidebarMenuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard />,
    },
    {
      id: "products",
      label: "Products",
      path: "/admin/products",
      icon: <ShoppingBasket />,
    },
    {
      id: "orders",
      label: "Orders",
      path: "/admin/orders",
      icon: <BadgeCheck />,
    },
  ];
  function MenuItems({ setOpen }) {
    const navigate = useNavigate();
    return (
      <nav>
        {adminSidebarMenuItems.map((menuitem) => (
          <div
            key={menuitem.id}
            onClick={() => {
              navigate(menuitem.path);
              setOpen ? setOpen(false) : null;
            }}
            className="flex items-center gap-2 rounded-md px-3 py-3 text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
          >
            {menuitem.icon}
            <span>{menuitem.label}</span>
          </div>
        ))}
      </nav>
    );
  }
  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full mt-3">
            <SheetHeader className="border-b mt-3">
              <SheetTitle className="text-2xl font-extrabold  m-2">
                Admin Panel
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col bg-background p-6 lg:flex gap-3 ">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center gap-2 cursor-pointer mb-2"
        >
          <ChartNoAxesCombined size={30} />{" "}
          <h1 className="text-2xl font-extrabold ">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
};

export default AdminSidebar;
