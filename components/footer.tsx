"use client";
import { useState, useEffect } from "react";
import { SocialMedia } from "./mini_components/Social_media";

export const Footer = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <footer className="w-full bg-white dark:bg-black text-gray-800 dark:text-gray-200 py-6 relative">
      <hr className="mb-2"/>
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between relative z-10">
        {/* Logo / Brand */}
        <div className="text-lg font-bold text-gray-500">MMSH</div>

        {/* Social Media Links */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <SocialMedia />
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm mt-4 relative z-10">
        &copy; {new Date().getFullYear()} MMSH Logistics. All rights reserved.
      </div>
    </footer>
  );
};
