import React from 'react'

const Card = ({name,price}) => {
  return (
    <div className="border p-4 rounded shadow hover:scale-105 transition-transform bg-white">
      <h2 className="font-bold text-xl">{name}</h2>
      <p className="text-gray-700 mt-2">{price}</p>
      <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
        Buy
      </button>
    </div>
  );
}
export default Card