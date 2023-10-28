import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./pages/App.jsx";
import ChatGPT from './pages/ChatGPT.jsx';
import './index.css'
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/chatgpt",
    element: <ChatGPT />,
  },
  // {
  //   path: "/",
  //   element: <App />,
  // },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
