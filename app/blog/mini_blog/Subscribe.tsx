"use client";
import React from "react";
import { useTranslation } from "react-i18next";

const SubscriptionSection: React.FC = () => {
  const { t } = useTranslation(); // ✅ Import translation function

  return (
    <div className="relative isolate overflow-hidden py-16 sm:py-24 lg:py-32 mt-2">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg">
            <h2 className="text-4xl font-semibold tracking-tight">
              {t("Subscription.title")}
            </h2>
            <p className="mt-4 text-lg">
              {t("Subscription.subtitle")}
            </p>
            <div className="mt-6 flex max-w-md gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                {t("Subscription.email_placeholder")}
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="min-w-0 flex-auto rounded-md bg-gray-100 px-3.5 py-2 text-base outline-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm"
                placeholder={t("Subscription.email_placeholder")}
              />
              <button
                type="submit"
                className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                {t("Subscription.subscribe_button")}
              </button>
            </div>
          </div>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-gray-100 p-2 ring-1 ring-gray-300">
                <svg className="w-6 h-6 " fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="indigo" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>
              </div>
              <dt className="mt-4 text-base font-semibold">
                {t("Subscription.benefits.weekly_articles")}
              </dt>
              <dd className="mt-2 text-base">
                {t("Subscription.benefits.weekly_articles_description")}
              </dd>
            </div>
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-gray-100 p-2 ring-1 ring-gray-300">
                <svg className="w-6 h-6 " fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="indigo" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.575a1.575 1.575 0 1 0-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 0 1 3.15 0v1.5m-3.15 0 .075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 0 1 3.15 0V15" />
                </svg>
              </div>
              <dt className="mt-4 text-base font-semibold">
                {t("Subscription.benefits.no_spam")}
              </dt>
              <dd className="mt-2 text-base">
                {t("Subscription.benefits.no_spam_description")}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSection;
