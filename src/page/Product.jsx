import React, { useState, useEffect, useContext } from "react";
import axios from "../api/axios";
import authContext from "../context/authContext";
import useAuth from "../context/useAuth";

const ProductDashboard = () => {
  const { fetchProducts, products , user} = useAuth();
 
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    image: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or Update product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editingId) {
        await axios.put(`/products/${editingId}`, form);
        setMessage("Product updated successfully!");
      } else {
        await axios.post("/products", form);
        setMessage("Product added successfully!");
      }
      setForm({ name: "", price: "", stock: "", image: "" });
      setEditingId(null);
      fetchProducts();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setMessage("Error! Try again.");
    } finally {
      setLoading(false);
    }
  };

  // Edit product
  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      stock: product.stock,
      image: product.image || "",
    });
    setEditingId(product._id);
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this product?")) return;
    try {
      setLoading(true);
      await axios.delete(`/products/${id}`);
      setMessage("Product deleted successfully!");
      fetchProducts();
      setTimeout(() => setMessage("Deleted"), 3000);
    } catch (err) {
      console.error(err);
      setMessage("Delete failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Product Dashboard</h1>

      {/* Feedback Message */}
      {message && (
        <p className="text-green-600 font-semibold text-center mb-4">
          {message}
        </p>
      )}

      {/* Add / Update Form */}
      {user?.role === "admin" && (
        <>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-2 mb-6 items-center justify-center"
          >
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="p-2 border rounded w-full md:w-auto"
              required
            />
            <input
              type="text"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              className="p-2 border rounded w-full md:w-auto"
              required
            />
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={form.stock}
              onChange={handleChange}
              className="p-2 border rounded w-full md:w-auto"
              required
            />
            <input
              type="text"
              name="image"
              placeholder="Image URL (optional)"
              value={form.image}
              onChange={handleChange}
              className="p-2 border rounded w-full md:w-auto"
            />
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 rounded text-white ${
                editingId
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading ? "Processing..." : editingId ? "Update" : "Add"}
            </button>
          </form>
        </>
      )}

      {/* Product Grid */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="border p-4 rounded shadow flex flex-col"
          >
            <img
              src={product.image || "https://via.placeholder.com/150"}
              alt={product.name}
              className="mb-2 w-full h-40 object-cover rounded"
            />
            <h2 className="font-bold">{product.name}</h2>
            <p>Price: ₹{product.price}</p>
            <p>Stock: {product.stock}</p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleEdit(product)}
                className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDashboard;
