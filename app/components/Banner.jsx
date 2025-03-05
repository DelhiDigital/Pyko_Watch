import React from "react";
import { Menu, Eye } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-orange-900 to-black flex items-center justify-center">
      {/* Left Menu Icon */}
      <div className="absolute top-4 left-4 text-white cursor-pointer">
        <Menu size={30} />
      </div>

      {/* Right Eye Icon */}
      <div className="absolute top-4 right-4 text-white cursor-pointer">
        <Eye size={30} />
      </div>

      {/* Brand Name */}
      <div className="text-center">
        <h1 className="text-white text-6xl font-serif tracking-wide">PYKO</h1>
        <p className="text-white text-lg mt-2">Reach your Peak</p>
      </div>

      {/* Watch Image */}
      <div className="absolute bottom-1/4 w-1/3">
        <img
          src="/images/watch.png" // Replace with actual watch image
          alt="Watch"
          className="w-full"
        />
      </div>

      {/* Floating "R" Icons */}
      <div className="absolute left-20 top-1/2 transform -translate-y-1/2 bg-green-500 p-3 rounded-full shadow-lg">
        <span className="text-white text-xl font-bold">R</span>
      </div>

      <div className="absolute right-20 top-1/2 transform -translate-y-1/2 bg-green-500 p-3 rounded-full shadow-lg">
        <span className="text-white text-xl font-bold">R</span>
      </div>
    </div>
  );
}