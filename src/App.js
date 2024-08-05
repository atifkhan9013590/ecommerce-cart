import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Cart from "./components/Cart";
import Header from "./components/Header";
import Productlist from "./components/Productlist";
import  { Toaster } from "react-hot-toast";

function App() {
  return (
   
      <div className="App">
        <Header />
        <Toaster/>
        <Routes>
          <Route path="/products" element={<Productlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/" element={<Productlist />} /> 
        </Routes>
      </div>
    
  );
}

export default App;
