import { useLocation } from "react-router-dom";

function Detail() {
    const location = useLocation();
    const product = location.state?.product;

    const saveCart = (cart) => {
        localStorage.setItem("cartItem", JSON.stringify(cart))
    }

    const getCart = () => {
        return JSON.parse(localStorage.getItem("cartItem")) || [];
    };

    const handleAddToCart = () => {
        let cart = getCart();
        let existingProduct = cart.find(item => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity += 1;
            if (existingProduct.quantity > product.stock) {
                alert("Số lượng sản phẩm trong giỏ hàng không được vượt quá tồn kho!");
                return;
            }
        } else {
            if (product.stock > 0) {
                cart.push({ ...product, quantity: 1 });
            } else {
                alert("Sản phẩm đã hết hàng!");
                return;
            }
        }
        saveCart(cart)
    };

    if (!product) return <p>Đang tải...</p>;

    return (
        <>
            {product ? (
                <div className="container mt-4">
                    <div className="row">
                        <div className="col-md-6">
                            <img src={product.thumbnail} alt={product.title} className="img-fluid" />
                        </div>
                        <div className="col-md-6">
                            <h2 style={{ color: 'red', textTransform: 'uppercase' }}>{product.title}</h2>
                            <h2>{product.brand}-{product.sku}</h2>
                            <h3>Đánh giá: {product.rating} sao</h3>
                            <p>{product.description}</p>
                            <h4>Giá: ${product.price}</h4>
                            <h4>Còn lại:{product.stock}</h4>
                            <button className="btn btn-success" onClick={handleAddToCart}>Mua ngay</button>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Không tìm thấy sản phẩm!</p>
            )}
        </>
    );
}

export default Detail;
