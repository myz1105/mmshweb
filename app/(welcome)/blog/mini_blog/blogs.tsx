"use client";
import React from "react";
import posts from "./blogs_data";
import { useTranslation } from "react-i18next";

const Comments: React.FC = () => {
  
  const { t } = useTranslation();  

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 text-center">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {t('Blog.blogs.from')}
          </h2>
          <p className="mt-2 text-lg">
          {t('Blog.blogs.learn')}
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-x-10 gap-y-16 border-t pt-10 sm:mt-16 sm:pt-16 lg:grid-cols-2 xl:grid-cols-3">
          {posts.map((post, index) => (
            <article
              key={index}
              className="flex flex-col items-start justify-between border border-violet-300 rounded-xl p-7 hover:border-violet-500 transition-all shadow-md duration-300 ease-in-out w-full max-w-2xl"
            >
              {/* Date & Category */}
              <div className="flex items-center gap-x-4 text-xs ">
                <time dateTime={post.date}>{post.date}</time>
                <span className="relative z-10 rounded-full bg-violet-100 px-3 py-1.5 font-medium text-violet-600 hover:bg-violet-200 transition-all cursor-pointer">
                  {post.category}
                </span>
              </div>

              {/* YouTube Video (Imported Dynamically from Data) */}
              <div className="relative w-full aspect-video mt-3">
                <iframe
                  className="w-full h-full rounded-lg shadow-md"
                  src={`https://www.youtube.com/embed/${post.videoId}`}
                  title={post.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Title */}
              <h3 className="mt-4 text-xl font-semibold  group-hover:text-violet-600 transition-all">
                {post.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-md ">{post.description}</p>

              {/* Author Section */}
              <div className="relative mt-6 flex items-center gap-x-4">
                <img
                  src={post.img}
                  alt={post.author}
                  className="w-12 h-12 rounded-full bg-gray-50"
                />
                <div className="text-sm">
                  <p className="font-semibold ">
                    <a href="#" className="hover:text-violet-600 transition-all">
                      {post.author}
                    </a>
                  </p>
                  <p className="">{post.role}</p>
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
