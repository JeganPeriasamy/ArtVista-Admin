import React from "react";
import "./CSS/Admin.css";
import Sidebar from "../Components/Sidebar/Sidebar";
import AddProduct from "../Components/AddProduct/AddProduct";
import { Route, Routes } from "react-router-dom";
import ListProduct from "../Components/ListProduct/ListProduct";
import Orders from "../Components/Orders/Orders";

const Admin = () => {
  const url = "https://artvista-backend-3ycc.onrender.com"; // Backend URL
  return (
    <div className="admin">
      <Sidebar />
      <Routes>
        <Route path="/addproduct" element={<AddProduct url={url} />} />
        <Route path="/listproduct" element={<ListProduct url={url} />} />
        <Route path="/orders" element={<Orders url={url}/>}/>
      </Routes>
    </div>
  );
};

export default Admin;
