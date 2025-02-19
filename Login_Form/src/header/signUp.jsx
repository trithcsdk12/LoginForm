import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignUp = (event) => {
    event.preventDefault();
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password.trim()
    ) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    } else {
      const existingUsers =
        JSON.parse(localStorage.getItem("userRegister")) || [];
      if (existingUsers.find((user) => user.email === formData.email)) {
        alert("Email này đã được sử dụng!");
        return;
      }

      existingUsers.push(formData);
      alert("Đăng ký thành công, trở về trang đăng nhập!");
      localStorage.setItem("userRegister", JSON.stringify(existingUsers));
      navigate("/signIn");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <>
      <form
        action=""
        className=" position-absolute top-50 start-50 translate-middle"
        onSubmit={handleSignUp}
      >
        <h1>Đăng ký</h1>
        <hr />
        <div className="inputName">
          <h3>Nhập tên: </h3>
          <input
            className="d-flex m-2"
            placeholder="Nhập tên"
            type="text"
            name="name"
            onChange={handleChange}
          />
        </div>
        <div className="inputEmail">
          <h3>Nhập email: </h3>
          <input
            className="d-flex m-2"
            placeholder="Nhập email"
            type="email"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="inputPassword">
          <h3>Nhập mật khẩu</h3>
          <input
            className="d-flex m-2"
            type="password"
            name="password"
            onChange={handleChange}
          />
        </div>
        <button className="d-flex m-2" type="submit">
          Đăng nhập
        </button>
      </form>
    </>
  );
}

export default SignUp;
