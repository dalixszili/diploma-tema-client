import React from "react";
import Dashboard from "./pages_admin/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./pages_admin/Users";
import LogoutAdmin from "./components_admin/LogoutAdmin";
import Logout from "./components/Logout";
import Settings from "./pages_admin/Settings";
import Login from "./components_admin/Login";
import Menus from "./pages_admin/Menus";
import Pages from "./pages_admin/Pages";
import AddPage from "./pages_admin/AddPage";
import UpdatePage from "./pages_admin/UpdatePage";
import Home from "./pages/Home";
import VerifyEmail from "./pages/VerifyEmail";
import ResetPassword from "./pages/ResetPassword";
import Account from "./pages_admin/Account";
// import UpdateProject from "./components/UpdateProject";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/:id/verify/:token" element={<VerifyEmail />} />
        <Route
          path="/users/:id/resetpassword/:token"
          element={<ResetPassword />}
        />
        <Route path="/logout" element={<Logout />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/logout" element={<LogoutAdmin />} />
        <Route path="/admin/account" element={<Account />} />
        <Route path="/admin/settings" element={<Settings />} />
        <Route path="/admin/menus" element={<Menus />} />
        <Route path="/admin/pages" element={<Pages />} />
        <Route path="/admin/addpage" element={<AddPage />} />
        <Route path="/admin/page/:pageId/edit" element={<UpdatePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
