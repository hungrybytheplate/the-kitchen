import { UtensilsCrossed, Calendar, Heart, ShoppingCart, GlassWater } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  appMode: "cook" | "drink";
  mealPlanCount: number;
  savedCount: number;
  shoppingCount: number;
}

export function BottomNav({ activeTab, onTabChange, appMode, mealPlanCount, savedCount, shoppingCount }: BottomNavProps) {
  const tabs = [
    {
      id: "ingredients",
      label: appMode === "cook" ? "Cook" : "Mix",
      icon: appMode === "cook" ? UtensilsCrossed : GlassWater,
      count: 0,
    },
    {
      id: "calendar",
      label: "Plan",
      icon: Calendar,
      count: mealPlanCount,
    },
    {
      id: "saved",
      label: "Saved",
      icon: Heart,
      count: savedCount,
    },
    {
      id: "shopping",
      label: "Shop",
      icon: ShoppingCart,
      count: shoppingCount,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-xl border-t border-border/50 sm:hidden safe-area-bottom">
      <div className="flex items-stretch justify-around h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "relative flex flex-col items-center justify-center flex-1 gap-0.5 transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground active:text-foreground"
              )}
              aria-label={tab.label}
            >
              <div className="relative">
                <Icon className={cn("h-5 w-5", isActive && "stroke-[2.5]")} />
                {tab.count > 0 && (
                  <Badge className="absolute -top-1.5 -right-2.5 h-4 min-w-4 p-0 text-[9px] flex items-center justify-center gradient-warm border-2 border-card">
                    {tab.count > 99 ? "99+" : tab.count}
                  </Badge>
                )}
              </div>
              <span className={cn(
                "text-[10px] font-medium",
                isActive && "font-semibold"
              )}>
                {tab.label}
              </span>
              {isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
