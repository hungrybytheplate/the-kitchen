import { ChefHat, Sparkles } from "lucide-react";

export function Header() {
  return (
    <header className="py-5 px-4 border-b border-border/30 glass sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 gradient-warm blur-xl opacity-40 animate-pulse-soft" />
            <div className="relative p-3 rounded-2xl gradient-warm shadow-warm">
              <ChefHat className="h-7 w-7 text-primary-foreground" />
            </div>
          </div>
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
              The Plate
            </h1>
            <p className="text-sm text-muted-foreground font-medium hidden sm:block">
              Turn your ingredients into delicious meals
            </p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-accent/50 border border-accent-foreground/10">
          <Sparkles className="h-4 w-4 text-accent-foreground" />
          <span className="text-sm font-medium text-accent-foreground">AI-Powered Recipes</span>
        </div>
      </div>
    </header>
  );
}