import express from "express";
import cors from "cors";
const app = express();
const PORT = 3000;

app.use(cors());
// Tạo danh sách 100 sản phẩm giả lập
const products = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  title: `Product ${i + 1}`,
  description: `Description for Product ${i + 1}`,
  category: ["beauty", "electronics", "fashion", "home"][i % 4],
  price: (Math.random() * 100).toFixed(2),
  discountPercentage: (Math.random() * 10).toFixed(2),
  rating: (Math.random() * 5).toFixed(2),
  stock: Math.floor(Math.random() * 100) + 1,
  tags: ["tag1", "tag2", "tag3"],
  brand: `Brand ${i + 1}`,
  sku: `SKU${i + 1}`,
  weight: Math.floor(Math.random() * 10) + 1,
  dimensions: {
    width: (Math.random() * 50).toFixed(2),
    height: (Math.random() * 50).toFixed(2),
    depth: (Math.random() * 50).toFixed(2),
  },
  warrantyInformation: "1 year warranty",
  shippingInformation: "Ships in 3-5 days",
  availabilityStatus: i % 2 === 0 ? "In Stock" : "Low Stock",
  reviews: [
    {
      rating: Math.floor(Math.random() * 5) + 1,
      comment: "Great product!",
      date: new Date().toISOString(),
      reviewerName: "John Doe",
      reviewerEmail: "john.doe@example.com",
    },
  ],
  returnPolicy: "30 days return policy",
  minimumOrderQuantity: Math.floor(Math.random() * 10) + 1,
  meta: {
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    barcode: `${Math.floor(Math.random() * 1000000000000)}`,
    qrCode: "https://assets.dummyjson.com/public/qr-code.png",
  },
  images: [
    "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png",
  ],
  thumbnail:
    "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png",
}));

// Định tuyến API
app.get("/api/products", (req, res) => {
  res.json({ products });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
