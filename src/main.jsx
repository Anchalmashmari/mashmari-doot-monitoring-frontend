import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";

import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Dashmain from "./pages/Dashmain.jsx";
import Projectlog from "./pages/Projectlog.jsx";
import { Settings } from "lucide-react";
import FolderProject from "./pages/FolderProject.jsx";
import ProjectFolder from "./pages/ProjectFolder.jsx";



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
       <Route path="/" element={<Login />} />
       <Route path="/dashboard" element={<Dashboard/>}/>
       <Route path="/dashmain" element={<Dashmain/>}/>
       <Route path="/projectlog" element={<Projectlog/>}/>
       <Route path="/settings" element={<Settings/>}/>
       <Route path="/project-log/:code" element={<ProjectFolder />} />

     
    </Route>
  )
)


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>
);
