import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { FaInstagram } from "react-icons/fa";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title({ color: "violet" })}>Use&nbsp;</span>
        <span className={title()}>MMSH&nbsp;</span>
        <br />
        <span className={title({ color: "violet" })}>
          to solve your logistics and accounting problems
        </span>
        <div className={subtitle({ class: "mt-4" })}>
          Beautiful, quick and modern app is ready to serve you
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
          Learn More
        </Link>
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href="https://www.instagram.com/mmshlogistics?igsh=MW9mbjd0aXB0Y2xpdw=="
        >
          <FaInstagram size={20} />
          Instagram
        </Link>
      </div>

      <div className="mt-8">
        <Snippet hideCopyButton hideSymbol variant="bordered">
          <span>
            Get started by registering{" "}
            <Link href="/authentication">
              <Code color="primary">Login</Code>
            </Link>
          </span>
        </Snippet>
      </div>
    </section>
  );
}
