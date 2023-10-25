import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../components/show-case-ui/Home";
import PhotoManager from "../components/show-case-ui/PhotoManager";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <PhotoManager /> },
      { path: "rtk", element: <Home /> },
      { path: "rtkq", element: <PhotoManager /> },
    ],
  },
]);
