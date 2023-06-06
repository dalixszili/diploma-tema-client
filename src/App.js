import React from "react";
import Dashboard from "./pages_admin/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./pages_admin/Users";
import Logout from "./components_admin/Logout";
import Settings from "./pages_admin/Settings";
import Login from "./components_admin/Login";
import Menus from "./pages_admin/Menus";
import Pages from "./pages_admin/Pages";
import AddPage from "./pages_admin/AddPage";
import UpdatePage from "./pages_admin/UpdatePage";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/logout" element={<Logout />} />
          <Route path="/admin/settings" element={<Settings />} />
          <Route path="/admin/menus" element={<Menus />} />
          <Route path="/admin/pages" element={<Pages />} />
          <Route path="/admin/addpage" element={<AddPage />} />
          <Route path="/admin/page/:pageId/edit" element={<UpdatePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
