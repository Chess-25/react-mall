import Main from "@/views";
import Home from "@/views/home";
import Category from "@/views/category";
import Cart from "@/views/cart";
import Profile from "@/views/profile";
import Detail from "@/views/detail";
import { Redirect } from "react-router-dom";

const routes = [
  {
    path: "/",
    exact: true,
    render: () => <Redirect to="/main" />,
  },
  {
    path: "/main",
    component: Main,
    routes: [
      {
        path: "/main",
        exact: true,
        render: () => <Redirect to="/main/home" />,
      },
      {
        path: "/main/home",
        component: Home,
      },
      {
        path: "/main/category",
        component: Category,
      },
      {
        path: "/main/cart",
        component: Cart,
      },
      {
        path: "/main/profile",
        component: Profile,
      },
    ],
  },
  {
    path: "/detail/:id",
    component: Detail,
  },
];

export default routes;
