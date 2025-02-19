import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useEffect } from "react";
import styles from "./product.module.scss";
import { useNavigate } from "react-router-dom";

function FakeProduct() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  const handleProductClick = (product) => {
    navigate(`/detail/${product.id}`, { state: { product } });
  };

  return (
    <>
      <div className="container-fluid row d-flex">
        {products.map((product) => (
          <div key={product.id} className="col-md-3 mb-3">
            <div className="card">
              <div onClick={() => handleProductClick(product)}>
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className={`${styles.productThumbnail} card-img-top`}
                />
              </div>
              <div className="card-body">
                <div
                  onClick={() => handleProductClick(product)}
                  className={styles.productLink}
                >
                  <h5 className={`${styles.productTitle} card-title`}>
                    {product.title}
                  </h5>
                </div>
                <p className="card-text">Giá: ${product.price}</p>
                <div
                  onClick={() => handleProductClick(product)}
                  className="btn btn-primary"
                >
                  Xem chi tiết
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default FakeProduct;
