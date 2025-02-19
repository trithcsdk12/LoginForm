import { useEffect, useState } from "react";

function Cart() {
  const getCart = () => {
    return JSON.parse(localStorage.getItem("cartItem")) || [];
  };

  const saveCart = (cart) => {
    localStorage.setItem("cartItem", JSON.stringify(cart));
  };

  const checkStock = (item, quantity) => {
    return quantity > item.stock ? item.stock : quantity;
  };

  const handleUpdateQuantity = (index, newquantity) => {
    let updatedCart = [...cart];
    updatedCart[index].quantity = newquantity;
    setCart(updatedCart);
    saveCart(updatedCart);
  };

  const handleUpQuantity = (index) => {
    let updatedCart = [...cart];
    let newQuantity = updatedCart[index].quantity + 1;
    updatedCart[index].quantity = checkStock(updatedCart[index], newQuantity);
    setCart(updatedCart);
    saveCart(updatedCart);
  };

  const handleDownQuantity = (index) => {
    let updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setCart(updatedCart);
      saveCart(updatedCart);
    }
  };

  const removeFromCart = (index) => {
    let updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    saveCart(updatedCart);
  };

  const totalProduct = (item, quantity) => {
    return item.price * quantity;
  };

  const [cart, setCart] = useState(getCart());

  const getTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + totalProduct(item, item.quantity),
      0
    );
  };

  return (
    <>
      <div>
        <h1 className="titleCart">Giỏ hàng của bạn</h1>
      </div>
      {cart.length === 0 ? (
        <h1 className=" position-absolute top-50 start-50 translate-middle text-center">
          Giỏ hàng trống, vào sản phẩm mua ngay
        </h1>
      ) : null}
      <div className="container row row-3 m-3">
        {cart.map((item, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card d-flex justify-content-center">
              <img src={item.thumbnail} alt={item.title} />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">Giá: $ {item.price}</p>
                <p className="card-text">Số lượng còn lại {item.stock}</p>
                <p className="card-text">
                  Tổng giá: ${" "}
                  {Math.round(totalProduct(item, item.quantity) * 100) / 100}
                </p>
              </div>
            </div>
            <div className="row">
              <a
                className="btn btn-primary col-2 mx-2"
                onClick={() => handleUpQuantity(index)}
              >
                +
              </a>
              <input
                type="number"
                className="col-2 mx-2"
                value={item.quantity}
                onChange={(e) => {
                  let newQuantity = parseInt(e.target.value) || 1;
                  handleUpdateQuantity(index, checkStock(item, newQuantity));
                }}
              />
              <a
                className="btn btn-primary col-2 mx-2"
                onClick={() => handleDownQuantity(index)}
              >
                -
              </a>
              <a
                className="btn btn-primary col-2 mx-2"
                onClick={() => removeFromCart(index)}
              >
                X
              </a>
            </div>
          </div>
        ))}
      </div>
      {cart.length > 0 && (
        <div className="text-center mt-4">
          <h3>
            Tổng giá trị giỏ hàng: ${Math.round(getTotalPrice() * 100) / 100}
          </h3>
          <a className="btn btn-primary" href="#">
            Thanh toán
          </a>
        </div>
      )}
    </>
  );
}

export default Cart;
