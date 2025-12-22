import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "../pages/api.jsx";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
        setProduct(null);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="p-10 text-2xl font-semibold text-center text-gray-600">
        Product not found
      </div>
    );
  }

  return (
    <div className="grid max-w-6xl grid-cols-1 gap-12 p-6 mx-auto md:grid-cols-2">
      <div>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[500px] object-cover rounded-xl shadow"
        />
      </div>

      <div>
        <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>

        <p className="mt-4 text-3xl font-bold text-blue-600">
          ₹{product.price}
        </p>

        <p className="mt-6 leading-relaxed text-gray-600">
          {product.description}
        </p>

        <button className="px-8 py-4 mt-8 text-lg font-semibold text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"> Add to Cart</button>
      </div>
    </div>
  );
}
