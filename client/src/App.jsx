import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { JobListing } from "./pages/Listing";
import { AddJob } from "./pages/JobForm";
import { Detail } from "./pages/Detail";
import { Toaster } from "react-hot-toast";

function App() {
  
  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addJob" element={<AddJob />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/listing" element={<JobListing />} />
        <Route path="/" element={<JobListing />} />
      </Routes>
    </>
  );
}

export default App;
