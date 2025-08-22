import React, { useEffect } from "react";
import useAuth from "../context/useAuth";

const Item = () => {
  const { products, fetchProducts } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, []);

  if (!products) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="container mx-auto md:p-8 mt-9">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Our Products
      </h1>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-lg rounded-2xl p-5 flex flex-col items-center hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="w-full h-52 md:h-60 lg:h-64 mb-4 overflow-hidden rounded-xl">
                <img
                  src={product.image || "https://via.placeholder.com/300"}
                  alt={product.name}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h2 className="font-bold text-lg md:text-xl mb-2 text-center">
                {product.name}
              </h2>
              <p className="text-gray-700 mb-1 text-center">
                Price: ₹{product.price}
              </p>
              <p className="text-gray-700 text-center mb-3">
                Stock: {product.stock}
              </p>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 py-10">
            No products available
          </p>
        )}
      </div>
    </div>
  );
};

export default Item;
