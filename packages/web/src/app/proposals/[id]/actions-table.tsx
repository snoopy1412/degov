import { motion, AnimatePresence } from "framer-motion"; // 导入 framer-motion
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import type { ProposalItem } from "@/services/graphql/types";

import { ActionTableRaw } from "./action-table-raw";
import { ActionTableSummary } from "./action-table-summary";

interface ActionsTableProps {
  data?: ProposalItem;
  isFetching: boolean;
}

export function ActionsTable({ data, isFetching }: ActionsTableProps) {
  const [tab, setTab] = useState<"summary" | "raw">("summary");

  const actions = useMemo(() => {
    if (data) {
      return data?.calldatas?.map((calldata, index) => {
        return {
          target: data?.targets[index],
          calldata: calldata,
          value: data?.values[index],
          signature: data?.signatureContent?.[index] ?? calldata,
        };
      });
    }
    return [];
  }, [data]);

  const buttonVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    whileTap: { scale: 0.95 },
  };

  const contentVariants = {
    initial: { opacity: 0, y: 5 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -5 },
  };

  return Array.isArray(actions) && actions?.length > 0 ? (
    <div className="flex flex-col gap-[20px] rounded-[14px] bg-card p-[20px]">
      <header className="flex items-center justify-between">
        <motion.h4
          className="text-[26px] font-semibold"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.1 }}
        >
          Actions
        </motion.h4>

        <AnimatePresence mode="wait" initial={false}>
          {tab === "summary" ? (
            <motion.div
              key="raw-button"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={buttonVariants}
              transition={{ duration: 0.2 }}
            >
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTab("raw")}
                className="rounded-full border-border bg-card cursor-pointer"
                asChild
              >
                <motion.div whileTap={{ scale: 0.95 }}>Raw</motion.div>
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="summary-button"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={buttonVariants}
              transition={{ duration: 0.2 }}
            >
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTab("summary")}
                className="rounded-full border-border bg-card cursor-pointer"
                asChild
              >
                <motion.div whileTap={{ scale: 0.95 }}>Summary</motion.div>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence mode="wait" initial={false}>
        {tab === "summary" ? (
          <motion.div
            key="summary-content"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={contentVariants}
            transition={{ duration: 0.1, ease: "easeInOut" }}
          >
            <ActionTableSummary actions={actions} isLoading={isFetching} />
          </motion.div>
        ) : (
          <motion.div
            key="raw-content"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={contentVariants}
            transition={{ duration: 0.1, ease: "easeInOut" }}
          >
            <ActionTableRaw actions={actions} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  ) : null;
}
