import { title } from "@/components/primitives";
import Start_text from "./mini_blog/start_text";
import React from "react";
import Comments from "./mini_blog/blogs";
import StatisticsSection from "../about/mini_about/Statistics";
import SubscriptionSection from "./mini_blog/Subscribe";

export default function BlogPage() {
  return (
    <div className="relative isolate overflow-hidden px-6 lg:overflow-visible lg:px-0">
      <div className="">
        <Start_text />
        <Comments />
        <SubscriptionSection />
      </div>
    </div>
  );
}
