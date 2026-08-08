import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import Coverage from "../pages/Coverage/Coverage";
import AboutUs from "../pages/AboutUs/AboutUs";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import Rider from "../pages/Rider/Rider";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "../pages/Auth/ForgotPassword/ForgotPassword";
import SendParcel from "../pages/SendParcel/SendParcel";
import DashBoardLayout from "../layouts/DashBoardLayout";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../pages/Dashboard/Payment/PaymentCancelled";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import ApproveRiders from "../pages/Dashboard/ApproveRIders/ApproveRiders";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "rider",
        loader: () =>
          fetch("data/serviceCenters.json").then((res) => res.json()),
        element: (
          <PrivateRoute>
            <Rider></Rider>
          </PrivateRoute>
        ),
      },
      {
        path: "coverage",
        loader: () =>
          fetch("data/serviceCenters.json").then((res) => res.json()),
        Component: Coverage,
      },
      {
        path: "about",
        Component: AboutUs,
      },
      {
        path: "sendParcel",
        loader: () =>
          fetch("data/serviceCenters.json").then((res) => res.json()),
        element: (
          <PrivateRoute>
            <SendParcel></SendParcel>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "forgotPassword",
        Component: ForgotPassword,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashBoardLayout></DashBoardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "my-parcels",
        Component: MyParcels,
      },
      {
        path: "approve-riders",
        Component: ApproveRiders,
      },
      {
        path: "payment/:parcelId",
        Component: Payment,
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-cancelled",
        Component: PaymentCancelled,
      },
      {
        path: "payments-history",
        Component: PaymentHistory,
      },
    ],
  },
]);
