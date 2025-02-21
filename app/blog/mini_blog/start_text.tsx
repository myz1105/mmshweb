"use client";
import React from "react";
import { title } from "@/components/primitives";
import { version } from "node:os";

const Start_text: React.FC = () => {
  const scrollToSection = (desktopOffset: number, mobileOffset: number) => {
    const offset = window.innerWidth > 768 ? desktopOffset : mobileOffset;
    window.scrollTo({
      top: offset,
      behavior: "smooth"
    });
  };
  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };
  

      
  return (
    <div className="relative isolate overflow-hidden py-0 w-full">
      <div className="mx-auto w-full px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 text-center">
          <h2 className="text-5xl font-extrabold tracking-tight sm:text-7xl drop-shadow-md"><span className={title({ color: "violet" })}>Company News & Blogs&nbsp;</span></h2>
          <p className="mt-6 text-lg font-medium sm:text-xl">
            Stay updated with the latest news, insights, and articles from our company. Discover industry trends, company milestones, and expert opinions.
          </p>
          <div className="mt-8 flex justify-center gap-4">
                <a 
                href="#" 
                onClick={(event) => {
                    event.preventDefault();
                    scrollToSection(750, 1200);
                }} 
                className="px-6 py-3 text-lg text-white font-medium bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition"
                >
                Explore Blogs
                </a>

                <a 
                href="#" 
                onClick={(event) => {
                    event.preventDefault();
                    scrollToBottom();
                }} 
                className="px-6 py-3 text-lg font-medium border border-indigo-600 rounded-lg shadow-md hover:bg-indigo-600 hover:text-white transition"
                >
                Subscribe
                </a>
          </div>
        </div>
        
        <div id="blogs" className="mx-auto mt-16 w-full lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-1">
            {[
              { label: "Total Blog Posts", value: "150+" },
              { label: "Industry Reports", value: "50+" },
              { label: "Guest Contributors", value: "30+" },
              { label: "Years of Publishing", value: "10+" },
            ].map((item, index) => (
              <div key={index} className=" shadow-sm rounded-lg p-6 border border-indigo-300 transform hover:scale-105 transition-all">
                <dd className="text-4xl font-bold tracking-tight text-indigo-700">{item.value}</dd>
                <dt className="mt-2 text-base ">{item.label}</dt>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Start_text;