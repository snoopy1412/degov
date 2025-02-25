import Image from "next/image";
import Link from "next/link";

import { IndexerStatus } from "@/components/indexer-status";
import { socialConfig } from "@/config/social";

import { Nav } from "./nav";

export const Aside = () => {
  return (
    <div className="flex h-full w-full flex-col justify-between gap-[20px] px-[20px] pb-[20px]">
      <div className="flex flex-col gap-[10px]">
        <Link
          className="flex h-[76px] w-full items-center justify-center"
          href="/"
        >
          <Image
            src="/assets/image/logo.svg"
            alt="logo"
            width={128}
            height={26}
            className="h-[26px] w-[128px]"
          />
        </Link>
        <Nav />
      </div>

      <footer className="space-y-[16px]">
        <IndexerStatus />
        <div className="flex items-center justify-around gap-[10px]">
          {socialConfig.map((social) => (
            <a
              href={social.url}
              key={social.name}
              title={social.name}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex h-[24px] w-[24px] items-center justify-center rounded-full bg-card transition-opacity duration-300 hover:opacity-80"
            >
              <Image
                src={social.assetPath}
                alt={social.name}
                width={social?.width || 24}
                height={social?.height || 24}
                className="object-contain"
              />
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
};
