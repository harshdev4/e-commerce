import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SearchBar from "./components/searchBar/SearchBar.jsx";
import Login from "./components/authComp/login/Login.jsx";
import Register from "./components/authComp/register/Register.jsx";
import Cart from "./components/cart/Cart.jsx";
import InputContextProvider from "./context/authInputContext.jsx";
import ErrorStateProvider from "./context/errorState.jsx";
import AuthUserStateProvider from "./context/authUserContext.jsx";
import UserProfile from "./components/profile/UserProfile.jsx";
import EditInfoProvider from "./context/editInfoContext.jsx";
import EditProfile from "./components/editProfile/EditProfile.jsx";
import Dashboard from "./components/admin-dashboard/Dashboard.jsx";
import ForgotPass from "./components/forgotPass/ForgotPass.jsx";
import PopupStateProvider from "./context/popupContext.jsx";
import HomePage from "./components/pages/homePage/HomePage.jsx";
import ProductPage from "./components/productPage/ProductPage.jsx";
import CategoriesPage from "./components/pages/categoryPage/CategoriesPage.jsx";
import SuccessPayment from "./components/pages/payment/SuccessPayment.jsx";
import CancelPayment from "./components/pages/payment/CancelPayment.jsx";
import BuyPage from "./components/pages/buyPage/BuyPage.jsx";
import Orders from "./components/pages/ordersPage/Orders.jsx";
import OrderSummary from "./components/pages/orderSummaryPage/OrderSummary.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/search",
        element: <SearchBar />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signUp",
        element: <Register />,
      },
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/myProfile",
        element: <UserProfile />,
      },
      {
        path: "/profile/:editType/edit",
        element: <EditProfile />,
      },
      {
        path: "/admin/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPass/>
      },
      {
        path: "/product/:productId",
        element: <ProductPage/>
      },
      {
        path: "/category/:category",
        element: <CategoriesPage/>
      },
      {
        path: "/checkout/product/summary/66e0473866e04738aa582c7fc5eb889baa582c7fc5eb889b",
        element: <BuyPage/>
      },
      {
        path: "/payment/success/:productIds",
        element: <SuccessPayment/>
      },
      {
        path: "/payment/cancel",
        element: <CancelPayment/>
      },
      {
        path: "/orders",
        element: <Orders/>
      },
      {
        path: "/order-details/:orderId",
        element: <OrderSummary/>
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
      <AuthUserStateProvider>
        <InputContextProvider>
        <EditInfoProvider>
          <ErrorStateProvider>
          <PopupStateProvider>
            <RouterProvider router={router}>
              <App />
            </RouterProvider>
            </PopupStateProvider>
          </ErrorStateProvider>
          </EditInfoProvider>
        </InputContextProvider>
      </AuthUserStateProvider>
);
