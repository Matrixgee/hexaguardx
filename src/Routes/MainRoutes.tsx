import { createBrowserRouter, RouteObject } from "react-router-dom";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import Home from "../Pages/Home";
import Policy from "../Pages/Policy";
import Layout from "../layouts/Layout";

import Overview from "../Client/Overview";
import Deposit from "../Client/Deposit";
import Myplans from "../Client/Myplans";
import History from "../Client/History";
import Support from "../Client/Support";
import Withdraw from "../Client/Withdraw";
import Packages from "../Client/Packages";
import Account from "../Client/Account/Account";
import Profile from "../Client/Account/Profile";
import Security from "../Client/Account/Security";
import ForgetPassword from "../Auth/ForgetPassword";
import Review from "../Pages/Review";
import UserPrivateRoute from "./UserPrivateRoute";
// import Users from "../Admin/Users";
// import AdminTransactions from "../Admin/AdminTransactions";
import Admin from "../Admin/Admin";
import AdminRoute from "./AdminRoute";
import About from "../Pages/About";
import AdminHome from "../Admin/AdminHome";
import Allusers from "../Admin/Allusers";
import AdminDeposit from "../Admin/AdminDeposit";
import AdminWithdraw from "../Admin/AdminWithdraw";
import InvestmentPack from "../Admin/InvestmentPack";
import UserDetails from "../Admin/UserDetails";
import WelcomeAdmin from "../Admin/WelcomeAdmin";
import AdminSupport from "../Admin/AdminSupport";
import ResetPassword from "../Auth/ResetPassword";
import Settimg from "../Admin/Settimg";
import AllInvestment from "../Admin/AllInvestment";
import Maintance from "../Admin/Maintance";
import Authlayout from "../layouts/authlayout";
import ContactUs from "../Pages/contact";
import Dashboard from "../layouts/userlayouts";

// Define the route objects
const routes: RouteObject[] = [
  {
    path: "auth",
    element: <Authlayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forget",
        element: <ForgetPassword />,
      },
      {
        path: "reset",
        element: <ResetPassword />,
      },
    ],
  },

  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "policy",
        element: <Policy />,
      },
      {
        path: "review",
        element: <Review />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <ContactUs />,
      },
    ],
  },
  {
    element: <UserPrivateRoute />, // Protecting user routes
    children: [
      {
        path: "user",
        element: <Dashboard />,
        children: [
          {
            path: "overview",
            element: <Overview />,
          },
          {
            path: "deposit",
            element: <Deposit />,
          },
          {
            path: "my-plans",
            element: <Myplans />,
          },
          {
            path: "history",
            element: <History />,
          },
          {
            path: "support",
            element: <Support />,
          },
          {
            path: "withdraw",
            element: <Withdraw />,
          },
          {
            path: "packages",
            element: <Packages />,
          },
          {
            path: "account",
            element: <Account />,
            children: [
              {
                path: "profile",
                element: <Profile />,
              },
              {
                path: "security",
                element: <Security />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    element: <AdminRoute />,
    children: [
      {
        path: "admin",
        element: <Admin />,
        children: [
          {
            path: "adminhome",
            element: <AdminHome />,
          },
          {
            path: "allusers",
            element: <Allusers />,
          },
          {
            path: "admindeposit",
            element: <AdminDeposit />,
          },
          {
            path: "adminwithdraw",
            element: <AdminWithdraw />,
          },
          {
            path: "packs",
            element: <InvestmentPack />,
          },
          {
            path: "userdetails/:_id",
            element: <UserDetails />,
          },
          {
            path: "adminsupprt",
            element: <AdminSupport />,
          },
          {
            path: "allinvestment",
            element: <AllInvestment />,
          },

          {
            path: "settings",
            element: <Settimg />,
          },
        ],
      },
    ],
  },
  {
    path: "welcomeadmin",
    element: <WelcomeAdmin />,
  },
  {
    path: "main",
    element: <Maintance />,
  },
];

export const MainRoutes = createBrowserRouter(routes);
