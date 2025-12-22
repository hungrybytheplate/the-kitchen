import { Moon, Sun, Snowflake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuickTooltip } from "@/components/Tooltip";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });

  const [isHoliday, setIsHoliday] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("holiday");
    }
    return false;
  });

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else if (storedTheme === "light") {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }

    const storedHoliday = localStorage.getItem("holidayTheme");
    if (storedHoliday === "true") {
      document.documentElement.classList.add("holiday");
      setIsHoliday(true);
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const toggleHolidayTheme = () => {
    const newIsHoliday = !isHoliday;
    setIsHoliday(newIsHoliday);
    if (newIsHoliday) {
      document.documentElement.classList.add("holiday");
      localStorage.setItem("holidayTheme", "true");
    } else {
      document.documentElement.classList.remove("holiday");
      localStorage.setItem("holidayTheme", "false");
    }
  };

  return (
    <div className="flex items-center gap-1">
      <QuickTooltip content={isHoliday ? "Regular theme" : "Holiday theme"} side="bottom">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleHolidayTheme}
          className={cn(
            "text-muted-foreground hover:text-foreground transition-all",
            isHoliday && "text-red-500 hover:text-red-600 bg-red-500/10"
          )}
        >
          <Snowflake className={cn("h-5 w-5", isHoliday && "animate-pulse")} />
        </Button>
      </QuickTooltip>
      <QuickTooltip content={isDark ? "Light mode" : "Dark mode"} side="bottom">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="text-muted-foreground hover:text-foreground"
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </QuickTooltip>
    </div>
  );
}
