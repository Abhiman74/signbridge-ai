"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/layout/theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle text-foreground/70 transition-colors hover:bg-surface-muted hover:text-foreground"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Moon className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  );
}
