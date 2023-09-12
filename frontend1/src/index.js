import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Final from "./components/Final";
import SignUp from "./components/SignUp";

const Applayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

const approuter = createBrowserRouter([
  {
    path: "/",
    element: <Applayout />,
    children: [
      {
        path: "/",
        element: <SignUp />,
      },
      {
        path: "/final",
        element: <Final />,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={approuter} />);

// mongo pass - manuzealyug
