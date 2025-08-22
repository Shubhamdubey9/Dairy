import React, { useState, useEffect, useContext } from "react";
import api from "../api/axios";
import useAuth from "../context/useAuth";

const MilkEntry = () => {
  const { user, fetchUser } = useAuth();
  const [entries, setEntries] = useState([]);
  const [formData, setFormData] = useState({

    quantity: "",
    fat: "",
    snf: "",
    date: "",
  });

  // fetch user on mount
  useEffect(() => {
    fetchUser();
  }, []);

  // update farmerId when user is fetched
  useEffect(() => {
    if (user?.id) {
      setFormData((prev) => ({ ...prev, farmerId: user.id }));
    }
  }, [user]);

  // Fetch entries based on role
  const fetchEntries = async () => {
    try {
      let res;
      if (user?.role === "admin") {
        res = await api.get("/milk/get");
      } else if (user?.id) {
        res = await api.get(`/milk/get/${user.id}`);
      }
      if (res) setEntries(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    if (user) fetchEntries();
  }, [user]);

  // Handle input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit new entry (only for farmer)
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const { quantity, fat, snf, date } = formData;
    await api.post("/milk/add", { quantity, fat, snf, date }); // farmerId मत भेजो
    setFormData({ quantity: "", fat: "", snf: "", date: "" });
    fetchEntries();
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
};


  if (!user) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">Milk Entry</h1>

      {/* Farmer: Show Add Form */}
      {user?.role === "farmer" && (
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-xl p-6 mb-6 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            type="number"
            name="quantity"
            placeholder="Quantity (liters)"
            value={formData.quantity}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
          <input
            type="number"
            step="0.1"
            name="fat"
            placeholder="Fat %"
            value={formData.fat}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
          <input
            type="number"
            step="0.1"
            name="snf"
            placeholder="SNF %"
            value={formData.snf}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
          <button
            type="submit"
            className="col-span-1 md:col-span-2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Add Entry
          </button>
        </form>
      )}

      {/* Entries Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200 text-sm md:text-base">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border p-2">Farmer</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Fat %</th>
              <th className="border p-2">SNF %</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry._id} className="hover:bg-gray-50">
                <td className="border p-2">{entry.farmerId?.name || "Self"}</td>
                <td className="border p-2">{entry.quantity} L</td>
                <td className="border p-2">{entry.fat}%</td>
                <td className="border p-2">{entry.snf}%</td>
                <td className="border p-2">
                  {new Date(entry.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {entries.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center text-gray-500 py-4 border"
                >
                  No entries found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MilkEntry;
