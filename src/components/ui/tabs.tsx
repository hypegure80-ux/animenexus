"use client";

import { cn } from "@/lib/utils";
import { useState, type ReactNode } from "react";

interface TabsProps {
  tabs: { id: string; label: string; content: ReactNode }[];
  className?: string;
}

export function Tabs({ tabs, className }: TabsProps) {
  const [active, setActive] = useState(tabs[0]?.id ?? "");

  return (
    <div className={className}>
      <div className="flex border-b border-gray-800 gap-0 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={cn(
              "px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors",
              active === tab.id
                ? "border-pink-500 text-pink-400"
                : "border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-600"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {tabs.find((t) => t.id === active)?.content}
      </div>
    </div>
  );
}
