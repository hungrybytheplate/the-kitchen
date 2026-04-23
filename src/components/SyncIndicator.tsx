import { useEffect, useState } from "react";
import { Cloud, CloudOff, RefreshCw, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePantry, type PantrySyncStatus } from "@/hooks/usePantry";
import { QuickTooltip } from "@/components/Tooltip";

/**
 * Compact pill that surfaces pantry sync state in the header.
 *
 * - `syncing`  → animated cloud + spinning arrow, "Syncing"
 * - `offline`  → muted CloudOff, "Offline"
 * - `synced`   → green check that auto-fades after 2.5s of being shown
 *                so it doesn't compete for attention long-term
 * - `idle`     → hidden
 */
export function SyncIndicator() {
  const { syncStatus, lastSyncedAt } = usePantry();
  const [showSynced, setShowSynced] = useState(false);

  useEffect(() => {
    if (syncStatus === "synced") {
      setShowSynced(true);
      const t = window.setTimeout(() => setShowSynced(false), 2500);
      return () => window.clearTimeout(t);
    }
  }, [syncStatus, lastSyncedAt]);

  // What to display right now (collapses 'synced' once its window passes).
  const displayStatus: PantrySyncStatus | null =
    syncStatus === "syncing" || syncStatus === "offline"
      ? syncStatus
      : syncStatus === "synced" && showSynced
        ? "synced"
        : null;

  if (!displayStatus) return null;

  const config = {
    syncing: {
      icon: (
        <RefreshCw className="h-3 w-3 animate-spin" aria-hidden />
      ),
      label: "Syncing",
      tooltip: "Loading your saved pantry from the server",
      classes: "bg-muted text-muted-foreground border-border",
    },
    offline: {
      icon: <CloudOff className="h-3 w-3" aria-hidden />,
      label: "Offline",
      tooltip: "Showing cached pantry. Changes will sync when you reconnect.",
      classes:
        "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30",
    },
    synced: {
      icon: <Check className="h-3 w-3" aria-hidden />,
      label: "Synced",
      tooltip: lastSyncedAt
        ? `Last synced ${new Date(lastSyncedAt).toLocaleTimeString()}`
        : "Pantry is up to date",
      classes:
        "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
    },
  }[displayStatus];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={displayStatus}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.18 }}
      >
        <QuickTooltip content={config.tooltip} side="bottom">
          <div
            role="status"
            aria-live="polite"
            aria-label={`Pantry sync status: ${config.label}`}
            className={cn(
              "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium",
              config.classes,
            )}
          >
            <Cloud className="hidden" aria-hidden />
            {config.icon}
            <span className="hidden sm:inline">{config.label}</span>
          </div>
        </QuickTooltip>
      </motion.div>
    </AnimatePresence>
  );
}