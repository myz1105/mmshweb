"use client";

import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";
import { title, subtitle } from "@/components/primitives";
import { FaInstagram } from "react-icons/fa";
import { useTranslations } from "next-intl"; // <-- FIXED
import LoadTable from "@/components/table-components/loads-table";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useClient } from "@/contexts/profile-management/client-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const t = useTranslations("Home"); // <-- namespace

  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />

      <div className="flex flex-grow pt-1">
        <div className="h-full w-full">
          <main className="container mx-auto max-w-7xl px-6 flex-grow h-full ">
            <section className="flex flex-col items-center justify-center gap-4 h-full">
              <div className="inline-block max-w-xl text-center justify-center">
                <span className={title()}>MMSH App</span>
                <br />
                <span className={title({ color: "violet" })}>
                  {t("solve_problems")}
                </span>
                <div className={subtitle({ class: "mt-4" })}>
                  {t("subtitle_text")}
                </div>
              </div>

              <div className="flex gap-3">
                <Link
                  className={`${buttonStyles({
                    radius: "full",
                    variant: "shadow",
                  })} bg-indigo-600 text-white hover:bg-indigo-800`}
                  href="/about"
                >
                  {t("learn_more")}
                </Link>
                <Link
                  isExternal
                  className={`${buttonStyles({ variant: "bordered", radius: "full" })} flex items-center gap-2`}
                  href="https://www.instagram.com/mmshlogistics?igsh=MW9mbjd0aXB0Y2xpdw=="
                >
                  <FaInstagram size={20} />
                  <span>{t("instagram")}</span>
                </Link>
              </div>

              <div className="mt-8">
                <Snippet hideCopyButton hideSymbol variant="bordered">
                  <span>
                    {t("get_started")}{" "}
                    <Link href="/authentication">
                      <Code color="primary">{t("login")}</Code>
                    </Link>
                  </span>
                </Snippet>
              </div>
            </section>
          </main>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
