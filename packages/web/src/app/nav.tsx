"use client";
import { routes } from "@/config/route";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className="flex w-full flex-col gap-[10px]">
      {routes.map((route) => {
        const isActive =
          pathname === route.pathname ||
          pathname.startsWith(route.pathname + "/");

        return (
          <Link
            key={route.key}
            href={route.pathname}
            className={cn(
              "group flex h-[60px] w-full items-center gap-[10px] rounded-[10px] px-[30px] capitalize",
              "transition-all duration-300 hover:bg-foreground hover:font-semibold hover:text-card",
              isActive && "bg-foreground font-semibold text-card"
            )}
          >
            <div className="relative h-[32px] w-[32px]">
              <Image
                src={`/assets/image/nav/${route.key}.svg`}
                alt={route.key}
                width={32}
                height={32}
                className={cn(
                  "absolute size-[32px] transition-opacity duration-200",
                  "group-hover:opacity-0"
                )}
              />
              <Image
                src={`/assets/image/nav/${route.key}-active.svg`}
                alt={route.key}
                width={32}
                height={32}
                className={cn(
                  "absolute size-[32px] transition-opacity duration-200",
                  isActive ? "opacity-100" : "opacity-0",
                  "group-hover:opacity-100"
                )}
              />
            </div>
            <span>{route.key}</span>
          </Link>
        );
      })}
    </nav>
  );
};
