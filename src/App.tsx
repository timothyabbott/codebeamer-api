import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Layout from "./components/Layout";
import SrsView from "./components/SrsView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/treeview" element={<SrsView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
