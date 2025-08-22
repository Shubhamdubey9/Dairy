import React from "react";
import heroImage from "../assets/dairy.webp";

const Hero = () => {
  return (
    <section className="relative bg-green-50">
      <div className="container mx-auto px-6 py-16 md:py-24 flex flex-col-reverse md:flex-row items-center gap-10">
        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-green-800 leading-snug mb-6">
            Fresh & Healthy Dairy Products
          </h1>
          <p className="text-gray-700 text-base sm:text-lg md:text-xl mb-8">
            Delivering farm-fresh milk, paneer, curd, and more directly to your
            doorstep. Quality you can trust!
          </p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition">
              Shop Now
            </button>
            <button className="px-6 py-3 border-2 border-green-600 text-green-600 font-semibold rounded-lg hover:bg-green-600 hover:text-white transition">
              Learn More
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={heroImage}
            alt="Dairy"
            className="w-full max-w-md md:max-w-full h-auto rounded-xl shadow-xl object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
