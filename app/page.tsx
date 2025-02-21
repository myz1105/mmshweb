"use client";

import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";
import { title, subtitle } from "@/components/primitives";
import { FaInstagram } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>MMSH App</span>
        <br />
        <span className={title({ color: "violet" })}>
          {t("Home.solve_problems")}
        </span>
        <div className={subtitle({ class: "mt-4" })}>
          {t("Home.subtitle_text")}
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
          {t("Home.learn_more")}
        </Link>
        <Link
          isExternal
          className={`${buttonStyles({ variant: "bordered", radius: "full" })} flex items-center gap-2`}
          href="https://www.instagram.com/mmshlogistics?igsh=MW9mbjd0aXB0Y2xpdw=="
        >
          <FaInstagram size={20} />
          <span>{t("Home.instagram")}</span>
        </Link>
      </div>

      <div className="mt-8">
        <Snippet hideCopyButton hideSymbol variant="bordered">
          <span>
            {t("Home.get_started")}{" "}
            <Link href="/authentication">
              <Code color="primary">{t("login")}</Code>
            </Link>
          </span>
        </Snippet>
      </div>
    </section>
  );
}
