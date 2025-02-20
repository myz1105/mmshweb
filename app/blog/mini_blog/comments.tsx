"use client";
import React from "react";
import {Image} from "@heroui/react";

const Comments: React.FC = () => {
  const posts = [
    {
      date: "Jan 10, 2023",
      category: "Business",
      title: "Increase Your Sales Effectively",
      description: "Discover strategies to enhance your sales and build a loyal customer base.",
      author: "Sarah Johnson",
      role: "CEO / Founder",
      img: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      date: "Feb 22, 2023",
      category: "Technology",
      title: "The Future of AI in Marketing",
      description: "How artificial intelligence is transforming the way businesses approach marketing.",
      author: "David Brown",
      role: "Tech Lead",
      img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      date: "Mar 5, 2023",
      category: "Finance",
      title: "Managing Your Finances Smartly",
      description: "Learn how to budget, invest, and save efficiently for long-term success.",
      author: "Emily Carter",
      role: "Financial Advisor",
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      date: "Apr 15, 2023",
      category: "Health",
      title: "Mental Wellness in the Workplace",
      description: "How to maintain mental well-being while managing work stress and productivity.",
      author: "Jessica Lee",
      role: "HR Specialist",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      date: "May 8, 2023",
      category: "Education",
      title: "The Rise of Online Learning",
      description: "Understanding the impact of e-learning and its future in modern education.",
      author: "Mark Anderson",
      role: "Education Consultant",
      img: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      date: "Jun 20, 2023",
      category: "Travel",
      title: "Top Destinations for Remote Work",
      description: "Discover the best travel spots for remote workers seeking productivity and adventure.",
      author: "Alex Martinez",
      role: "Travel Blogger",
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      date: "Jan 10, 2023",
      category: "Business",
      title: "Increase Your Sales Effectively",
      description: "Discover strategies to enhance your sales and build a loyal customer base.",
      author: "Sarah Johnson",
      role: "CEO / Founder",
      img: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      date: "Feb 22, 2023",
      category: "Technology",
      title: "The Future of AI in Marketing",
      description: "How artificial intelligence is transforming the way businesses approach marketing.",
      author: "David Brown",
      role: "Tech Lead",
      img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      date: "Mar 5, 2023",
      category: "Finance",
      title: "Managing Your Finances Smartly",
      description: "Learn how to budget, invest, and save efficiently for long-term success.",
      author: "Emily Carter",
      role: "Financial Advisor",
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      date: "Apr 15, 2023",
      category: "Health",
      title: "Mental Wellness in the Workplace",
      description: "How to maintain mental well-being while managing work stress and productivity.",
      author: "Jessica Lee",
      role: "HR Specialist",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      date: "May 8, 2023",
      category: "Education",
      title: "The Rise of Online Learning",
      description: "Understanding the impact of e-learning and its future in modern education.",
      author: "Mark Anderson",
      role: "Education Consultant",
      img: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      date: "Jun 20, 2023",
      category: "Travel",
      title: "Top Destinations for Remote Work",
      description: "Discover the best travel spots for remote workers seeking productivity and adventure.",
      author: "Alex Martinez",
      role: "Travel Blogger",
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  ];
  
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
            From the blog
          </h2>
          <p className="mt-2 text-lg/8 text-gray-600">
            Learn how to grow your business with our expert advice.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:grid-cols-3">
          {posts.map((post, index) => (
            <article 
              key={index} 
              className="flex max-w-xl flex-col items-start justify-between border border-violet-300 rounded-lg p-5 hover:border-violet-500 transition-all"
            >
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={post.date} className="text-gray-500">
                  {post.date}
                </time>
                <a
                  href="#"
                  className="relative z-10 rounded-full bg-violet-50 px-3 py-1.5 font-medium text-violet-600 hover:bg-violet-100"
                >
                  {post.category}
                </a>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold text-gray-900 group-hover:text-violet-600 flex items-center gap-x-2.5">
                  <Image
                    isBlurred
                    alt="HeroUI Album Cover"
                    src="https://heroui.com/images/hero-card-complete.jpeg"
                    width={150}
                  />
                  <a href="#" className="flex-1">
                    <span className="absolute inset-0"></span>
                    {post.title}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm text-gray-600">
                  {post.description}
                </p>
              </div>

              <div className="relative mt-8 flex items-center gap-x-4">
                <img
                  src={post.img}
                  alt=""
                  className="size-10 rounded-full bg-gray-50"
                />
                <div className="text-sm/6">
                  <p className="font-semibold text-gray-900">
                    <a href="#">
                      <span className="absolute inset-0"></span>
                      {post.author}
                    </a>
                  </p>
                  <p className="text-gray-600">{post.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>

  );
};

export default Comments;
