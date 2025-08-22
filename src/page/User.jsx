import React, { useEffect } from "react";
import useAuth from "../context/useAuth";
import axios from "../api/axios";

const User = () => {
  const { user, users, fetchUsers, fetchUser } = useAuth();

  useEffect(() => {
    fetchUser();
  }, []);

  // fetch all users if admin
  useEffect(() => {
    if (user?.role === "admin") {
      fetchUsers();
    }
  }, [user]);

const handleDelete = async (id) => {
  try {
    await axios.delete(`/users/delete/${id}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    if (user?.role === "admin") fetchUsers(); // refresh all users
    else fetchUser(); // refresh self
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
};


  if (!user)
    return <p className="text-center mt-20 text-gray-500">Loading...</p>;

  const userList = user.role === "admin" ? users : [user];

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        User Management
      </h1>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {userList.length > 0 ? (
          userList.map((u) => (
            <div
              key={u._id}
              className="bg-white shadow-lg rounded-xl p-6 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300"
            >
              <div>
                <h2 className="text-xl font-semibold mb-2 text-gray-900">
                  {u.name}
                </h2>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Email:</span> {u.email}
                </p>
                <p className="text-gray-600 mb-3">
                  <span className="font-medium">Role:</span> {u.role}
                </p>
              </div>
              <button
                onClick={() => handleDelete(u._id)}
                className="mt-auto bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-300"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 py-10">
            No users found
          </p>
        )}
      </div>
    </div>
  );
};

export default User;
