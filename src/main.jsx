import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./pages/App.jsx";
import ChatGPT from './pages/ChatGPT.jsx';
import ImageGenerator from './pages/Image-generator.jsx';
import Translator from './pages/Translator.jsx';
import ErrorPage from './pages/404.jsx';
import './index.css'
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/chatgpt",
    element: <ChatGPT />,
  },
  {
    path: "/image-generator",
    element: <ImageGenerator />,
  },
  {
    path: "/translator",
    element: <Translator />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
