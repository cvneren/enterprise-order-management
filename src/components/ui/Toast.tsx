"use client";

import { useToastStore } from "@/store/useToastStore";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function Toast() {
  const { message, isVisible } = useToastStore();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0, x: "-50%" }}
          animate={{ y: 0, opacity: 1, x: "-50%" }}
          exit={{ y: -100, opacity: 0, x: "-50%" }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="fixed top-6 left-1/2 z-[100] flex items-center gap-3 bg-[#111827] text-white px-5 py-3 rounded-lg shadow-xl border border-gray-800"
        >
          <CheckCircle2 className="w-5 h-5 text-green-400" />
          <span className="font-sans font-medium text-sm">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
