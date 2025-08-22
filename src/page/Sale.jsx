// import React from 'react'
// import { useState, useEffect } from "react";
// import axios from "../api/axios";
// const sale = () => {
//   const [sales, setSales] = useState([]);
//   const [product, setProduct] = useState("");
//   const [quantity, setQuantity] = useState("");

//   // Fetch sales from backend
//   const fetchSales = async () => {
//     try {
//       const res = await axios.get("/sales");
//       setSales(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchSales();
//   }, []);

//   // Add sale
//   const handleAdd = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("/sales", { product, quantity });
//       setProduct("");
//       setQuantity("");
//       fetchSales();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-4">Sales</h1>

//       {/* Add Sale Form */}
//       <form
//         onSubmit={handleAdd}
//         className="flex flex-col sm:flex-row gap-2 mb-6"
//       >
//         <input
//           type="text"
//           placeholder="Product"
//           value={product}
//           onChange={(e) => setProduct(e.target.value)}
//           className="p-2 border rounded w-full sm:w-auto"
//           required
//         />
//         <input
//           type="number"
//           placeholder="Quantity"
//           value={quantity}
//           onChange={(e) => setQuantity(e.target.value)}
//           className="p-2 border rounded w-full sm:w-auto"
//           required
//         />
//         <button
//           type="submit"
//           className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//         >
//           Add Sale
//         </button>
//       </form>

//       {/* Sales List */}
//       <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
//         {sales.map((s) => (
//           <div key={s._id} className="border p-4 rounded shadow">
//             <h2 className="font-bold">{s.product}</h2>
//             <p>Quantity: {s.quantity}</p>
//             <p>Date: {new Date(s.createdAt).toLocaleDateString()}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default sale