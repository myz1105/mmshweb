"use client";
import React from "react";
import { useTranslation } from "react-i18next";
const logo_without_bg = "/new_logo.png"; // ✅ Correct way to reference public assets


const StatisticsSection: React.FC = () => {
  const { t } = useTranslation(); // ✅ Import translation function

  const stats = [
    {
      label: t("Statistics.transactions"),
      value: "1,200",
    },
    {
      label: t("Statistics.assets"),
      value: "$119 million",
    },
    {
      label: t("Statistics.new_users"),
      value: "4,000",
    },
  ];

  return (
    <>
      <section className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,var(--color-indigo-100),white)] opacity-20"></div>
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] ring-1 shadow-xl shadow-white/10 ring-white/10 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"></div>
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <div className="flex items-center gap-4 justify-center">
          <img 
            className="" 
            src={logo_without_bg} 
            alt="MMSH Logo"
            style={{height: "120px"}} 
          />
        </div>
          <figure className="mt-10">
            <blockquote className="text-center text-xl font-semibold sm:text-2xl">
              <p>{t("Statistics.quote")}</p> {/* ✅ Translatable quote */}
            </blockquote>
            <figcaption className="mt-10 text-center">
              <img
                className="mx-auto rounded-full object-cover"
                src={'./CEO.png'}
                alt="Judith Black"
                style={{width: "130px", height: "130px"}}
              />
              <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                <div className="font-semibold">{t("Statistics.ceo_name")}</div>
                <svg viewBox="0 0 2 2" width="3" height="3" aria-hidden="true" className="fill-gray-900">
                  <circle cx="1" cy="1" r="1" />
                </svg>
                <div>{t("Statistics.ceo_title")}</div>
              </div>
            </figcaption>
          </figure>
        </div>

        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
              {stats.map((stat, index) => (
                <div key={index} className="mx-auto flex max-w-xs flex-col gap-y-4">
                  <dt className="text-base">{stat.label}</dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight sm:text-5xl">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  );
};

export default StatisticsSection;
