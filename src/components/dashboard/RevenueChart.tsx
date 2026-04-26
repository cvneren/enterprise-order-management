"use client";

import { motion } from "framer-motion";

export function RevenueChart() {
  const data = [
    { day: "Mon", value: 12000 },
    { day: "Tue", value: 15000 },
    { day: "Wed", value: 10000 },
    { day: "Thu", value: 22000 },
    { day: "Fri", value: 18000 },
    { day: "Sat", value: 25000 },
    { day: "Sun", value: 19000 },
  ];

  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-sm h-96 flex flex-col">
      <div className="mb-6">
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#71716E] font-sans">
          Revenue (Last 7 Days)
        </h3>
      </div>

      <div className="flex-1 flex items-end justify-between gap-4 relative">
        {/* Y Axis Guides */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8">
          {[4, 3, 2, 1, 0].map((i) => (
            <div
              key={i}
              className="w-full flex items-center text-xs font-medium text-on-surface-variant font-sans opacity-70 translate-y-1/2"
            >
              <span className="w-8 text-left">€{((maxValue * (i / 4)) / 1000).toFixed(0)}k</span>
              <div className="flex-1 border-b border-border/60"></div>
            </div>
          ))}
        </div>

        {/* Bars */}
        <div className="flex-1 flex items-end justify-around h-full z-10 pl-8 pb-8">
          {data.map((item, index) => {
            const heightPercentage = (item.value / maxValue) * 100;
            return (
              <div
                key={item.day}
                className="flex flex-col items-center group w-full px-2 h-full justify-end relative"
              >
                {/* Tooltip */}
                <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-[#2f3130] text-[#f1f1f0] text-xs font-semibold py-1 px-2 rounded font-sans pointer-events-none whitespace-nowrap shadow-md z-20">
                  €{item.value.toLocaleString("en-US")}
                </div>

                {/* Animated Bar */}
                <motion.div
                  className="w-full max-w-[48px] bg-primary rounded-t-md hover:bg-primary/90 transition-colors"
                  initial={{ height: 0 }}
                  animate={{ height: `${heightPercentage}%` }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    delay: index * 0.1,
                  }}
                />

                {/* X Axis Label */}
                <span className="absolute -bottom-8 text-xs font-semibold text-[#71716E] font-sans">
                  {item.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
