import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [users, setUsers] = useState([]);

  // Fetch data
  const fetchData = async () => {
    try {
      const [pRes, sRes, uRes] = await Promise.all([
        axios.get("/products"),
        axios.get("/sales"),
        axios.get("/users"),
      ]);
      setProducts(pRes.data);
      setSales(sRes.data);
      setUsers(uRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Prepare sales by product for Bar Chart
  const salesData = products.map((prod) => {
    const totalQty = sales
      .filter((s) => s.product === prod.name)
      .reduce((sum, s) => sum + s.quantity, 0);
    return { name: prod.name, quantity: totalQty };
  });

  // Prepare users for Pie Chart
  const userRoles = users.reduce((acc, u) => {
    acc[u.role] = (acc[u.role] || 0) + 1;
    return acc;
  }, {});
  const pieData = Object.keys(userRoles).map((role) => ({
    name: role,
    value: userRoles[role],
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center text-green-700">
        Dairy Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 text-center">
          <h2 className="font-semibold text-gray-600 mb-2">Total Products</h2>
          <p className="text-3xl md:text-4xl font-bold text-green-600">
            {products.length}
          </p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 text-center">
          <h2 className="font-semibold text-gray-600 mb-2">Total Sales</h2>
          <p className="text-3xl md:text-4xl font-bold text-green-600">
            {sales.reduce((sum, s) => sum + s.quantity, 0)}
          </p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 text-center">
          <h2 className="font-semibold text-gray-600 mb-2">Total Users</h2>
          <p className="text-3xl md:text-4xl font-bold text-green-600">
            {users.length}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sales Bar Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <h2 className="font-semibold text-gray-700 mb-4 text-center md:text-left">
            Sales by Product
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="quantity" fill="#00C49F" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Users Pie Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <h2 className="font-semibold text-gray-700 mb-4 text-center md:text-left">
            Users by Role
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
