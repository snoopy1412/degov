"use client";
import { Search } from "lucide-react";
import { useState } from "react";

import { ConnectButton } from "@/components/connect-button";

export const Header = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <header className="w-full border-b border-border bg-background px-[30px] py-[20px]">
      {isFocused && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={() => setIsFocused(false)}
        />
      )}

      <div className="relative flex h-[36px] items-center justify-between">
        <div
          className={`flex h-[36px] w-[388px] items-center gap-[13px] rounded-[20px] border px-[17px] transition-all ${
            isFocused ? "z-50 bg-card/80" : "border-border bg-card"
          }`}
        >
          <Search className="h-[15px] w-[15px] text-white/50" />
          <input
            placeholder="Search proposals on DeGov"
            className="h-full flex-1 appearance-none bg-transparent outline-none"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </div>

        <ConnectButton />
      </div>
    </header>
  );
};
