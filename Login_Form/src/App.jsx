import { useState } from "react";
// import './App.css'
import Nav from "./header/nav";
import Product from "./article/products";
import Detail from "./article/detail";
import { Routes, Route, Link } from "react-router-dom";
import SignIn from "./header/signIn";
import Home from "./article/home";
import { useEffect } from "react";
import SignUp from "./header/signUp";
import Cart from "./article/cart";

function App() {
  const [showGoToTop, setShowGoToTop] = useState();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowGoToTop(window.scrollY >= 1000);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleGoToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Nav user={user} setUser={setUser} />
      <Routes>
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/product" element={<Product />} />
        <Route path="/signIn" element={<SignIn setUser={setUser} />} />
        <Route path="/" element={<Home />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/addToCart" element={<Cart />} />
      </Routes>
      {showGoToTop && (
        <button
          style={{ position: "fixed", right: 20, bottom: 20 }}
          onClick={handleGoToTop}
        >
          Go To Top
        </button>
      )}
    </>
  );
}

export default App;
