import React from 'react'
import Card from '../components/Card.jsx';
import Hero from '../components/Hero.jsx';
import Item from '../components/Item.jsx';

const HomePage = () => {
  const products = [
    { name: "Milk", price: "₹50/L" },
    { name: "Paneer", price: "₹200/kg" },
    { name: "Curd", price: "₹40/L" },
  ];

  return (
    <>
      <Hero />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-6">
          Welcome to Dairy System
        </h1>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
          {products.map((p, i) => (
            <Card key={i} name={p.name} price={p.price} />
          ))}
        </div>
        <Item />
      </div>
    </>
  );
}
export default HomePage