import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styles from "./nav.module.scss";
import { useRef } from "react";

const backgroundColorList = [
  {
    bg_color: "Red",
    text_color: "Black",
  },
  {
    bg_color: "Yellow",
    text_color: "Black",
  },
  {
    bg_color: "Pink",
    text_color: "White",
  },
  {
    bg_color: "Black",
    text_color: "White",
  },
  {
    bg_color: "Blue",
    text_color: "White",
  },
];

function ChangeBackgroundColor({ color, setColor, setTxColor, txColor }) {
  return (
    <li>
      <a
        className="dropdown-item"
        href="#"
        onClick={() => {
          setColor(color);
          setTxColor(txColor);
        }}
      >
        {color}
      </a>
    </li>
  );
}

function Nav({ user, setUser }) {
  const audioRef = useRef(null);
  const handlePlayMusic = () => {
    audioRef.current.play();
  };

  const handlePauseMusic = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
    }
  };

  const [products, setProducts] = useState([]);
  const [color, setColor] = useState("Gray");
  const [txColor, setTxColor] = useState("Black");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <>
      <audio ref={audioRef} id="backgroundMusic" loop>
        <source
          src="src/assets/Fly Me to the Moon - The Macarons Project.mp3"
          type="audio/mpeg"
        />
      </audio>
      <nav
        className="navbar navbar-expand-lg navbar-light py-3 mx-auto mb-5 sticky-top"
        id={`${styles.primaryNav}`}
        style={{ backgroundColor: color }}
      >
        <div className="container-fluid d-flex justify-content-between">
          <Link to="/" className={`${styles.thumbnailLink}`}>
            <img
              src="src/assets/logo_nav.webp"
              alt=""
              className={`${styles.logo} mx-0`}
              style={{ width: "100px", height: "100px" }}
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className={` nav-item mx-3`}>
                <Link
                  className={`${styles.iconHover} ${styles.iconContainer} nav-link`}
                  aria-current="page"
                  to="/"
                  style={{ color: txColor }}
                >
                  <i className="fa-solid fa-house"></i>
                  <span className={`${styles.iconText}`}>Trang chủ</span>
                </Link>
              </li>
              <li className="nav-item mx-3 dropdown">
                <a
                  className={`${styles.iconHover} ${styles.iconContainer} nav-link dropdown-toggle`}
                  href="#"
                  id="colorDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ color: txColor }}
                >
                  <i className="fa-solid fa-droplet"></i>
                  <span className={`${styles.iconText}`}>Đổi màu nền</span>
                </a>
                <ul className="dropdown-menu" aria-labelledby="colorDropdown">
                  {backgroundColorList.map((colorObj, index) => (
                    <ChangeBackgroundColor
                      key={index}
                      color={colorObj.bg_color}
                      txColor={colorObj.text_color}
                      setColor={setColor}
                      setTxColor={setTxColor}
                    />
                  ))}
                </ul>
              </li>
              {Boolean(user) ? (
                <>
                  <span className="nav-link mx-3" style={{ color: txColor }}>
                    Xin chào, {user.user.name}!
                  </span>
                  <a
                    onClick={handleLogout}
                    className={`${styles.iconHover} ${styles.iconContainer}`}
                  >
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    <span className={`${styles.iconText}`}>Đăng xuất</span>
                  </a>
                </>
              ) : (
                <li className="nav-item mx-3">
                  <a
                    className={`${styles.iconHover} ${styles.iconContainer} nav-link dropdown-toggle`}
                    href="#"
                    id="accountDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ color: txColor }}
                  >
                    <i className="fa-solid fa-user"></i>
                    <span className={`${styles.iconText}`}>Tài khoản</span>
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="accountDropdown"
                  >
                    <li>
                      <Link className="dropdown-item" to="/signIn">
                        <i className="fa-solid fa-arrow-right-to-bracket"></i>{" "}
                        Đăng nhập
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/signUp">
                        <i className="fa-solid fa-arrow-turn-up"></i> Đăng ký
                      </Link>
                    </li>
                  </ul>
                </li>
              )}
              <li className="nav-item mx-3 dropdown">
                <a
                  className={`${styles.iconHover} ${styles.iconContainer} nav-link dropdown-toggle`}
                  href="#"
                  id="userDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ color: txColor }}
                >
                  <i className="fa-solid fa-list"></i>
                  <span className={`${styles.iconText}`}>Loại sản phẩm</span>
                </a>
                <ul
                  className={`${styles.menu} dropdown-menu`}
                  aria-labelledby="userDropdown"
                >
                  {[
                    ...new Set(products.map((product) => product.category)),
                  ].map((category, index) => (
                    <li key={index}>
                      <span>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </span>
                      <hr className="dropdown-divider" />
                    </li>
                  ))}
                </ul>
              </li>
              <li className="nav-item mx-3" id={`${styles.iconHover}`}>
                <Link
                  className={`${styles.iconHover} ${styles.iconContainer} nav-link active`}
                  aria-current="page"
                  to="/product"
                  style={{ color: txColor }}
                >
                  <i className="fa-solid fa-cart-plus"></i>
                  <span className={`${styles.iconText}`}>Sản phẩm</span>
                </Link>
              </li>
              <li className="nav-item mx-3">
                <Link
                  className={`${styles.iconHover} ${styles.iconContainer} nav-link active`}
                  aria-current="page"
                  to="/addToCart"
                  style={{ color: txColor }}
                >
                  <i className="fa-solid fa-cart-shopping"></i>
                  <span className={`${styles.iconText}`}>Giỏ hàng</span>
                </Link>
              </li>
              <li
                className={`${styles.iconHover} ${styles.iconContainer} nav-item mx-3`}
              >
                <span onClick={handlePlayMusic}>
                  {" "}
                  <i className="fa-solid fa-music"></i>
                </span>
                <span
                  className={`${styles.iconText}`}
                  onClick={handlePlayMusic}
                >
                  Chơi nhạc
                </span>
              </li>
              <li
                className={`${styles.iconHover} ${styles.iconContainer} nav-item mx-3`}
              >
                <span onClick={handlePauseMusic}>
                  <i className="fa-solid fa-pause"></i>
                </span>
                <span
                  className={`${styles.iconText}`}
                  onClick={handlePauseMusic}
                >
                  Dừng nhạc
                </span>
              </li>
            </ul>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-success"
                type="submit"
                style={{ color: txColor }}
              >
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;
