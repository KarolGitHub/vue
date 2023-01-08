import { RouteRecordRaw } from "vue-router";

// layouts

// views for Admin layout

import Dashboard from "@/views/admin/Dashboard/Dashboard.vue";
import Settings from "@/views/admin/settings/Settings.vue";
import Tables from "@/views/admin/tables/Tables.vue";
import Maps from "@/views/admin/Maps.vue";

// views for Auth layout

import Login from "@/views/auth/login/Login.vue";
import Register from "@/views/auth/register/Register.vue";

// views without layouts

import Landing from "@/views/Landing.vue";
import Profile from "@/views/Profile.vue";
import Auth from "../layout/Auth.vue";
import Admin from "../layout/Admin.vue";
import Home from "../views/home/Home.vue";
import Sliders from "../views/admin/sliders/Sliders.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/admin",
    redirect: "/admin/dashboard",
    component: Admin,
    children: [
      {
        path: "/admin/dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "/admin/settings",
        component: Settings,
      },
      {
        path: "/admin/tables",
        component: Tables,
      },
      {
        path: "/admin/maps",
        component: Maps,
      },
      {
        path: "/admin/pos",
        name: "pos",
        component: Home,
      },
      {
        path: "/admin/sliders",
        name: "sliders",
        component: Sliders,
      },
    ],
  },
  {
    path: "/auth",
    redirect: "/auth/login",
    component: Auth,
    children: [
      {
        path: "/auth/login",
        name: "login",
        component: Login,
      },
      {
        path: "/auth/register",
        name: "register",
        component: Register,
      },
    ],
  },
  {
    path: "/about",
    component: Landing,
  },
  {
    path: "/profile",
    component: Profile,
  },
  { path: "/:pathMatch(.*)*", redirect: "/auth/login" },
];

export default routes;
