export interface SideBarItemInterface {
  title: string;
  icon: string;
  link: string;
  adminItem: boolean;
}

export const items: SideBarItemInterface[] = [
  {
    title: "Dashboard",
    icon: "dashboard",
    link: "/dashboard",
    adminItem: true
  },
  {
    title: "Orders",
    icon: "shopping_cart",
    link: "/orders",
    adminItem: false
  },
  {
    title: "Accounts",
    icon: "group",
    link: "/accounts",
    adminItem: false
  },
  {
    title: "Restaurants",
    icon: "restaurant",
    link: "/restaurants",
    adminItem: true
  },
  {
    title: "Dispatch",
    icon: "local_shipping",
    link: "/dispatch-riders",
    adminItem: true
  }
];
