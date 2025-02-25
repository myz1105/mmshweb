"use client";
import Sidebar from "@/components/main_components/sidebar";
import { ScrollShadow } from "@heroui/react";

export default function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen w-full overflow-hidden">
      <div className="flex flex-grow pt-1 w-full">
        {/* Ensure Sidebar has a defined width */}
        <Sidebar />

        {/* Ensure ScrollShadow takes full remaining space */}
        <ScrollShadow className="h-full w-full flex-1" hideScrollBar>
          <main className="h-full w-full">{children}</main>
        </ScrollShadow>
      </div>
    </div>
  );
}
