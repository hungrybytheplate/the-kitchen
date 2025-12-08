import { ChefHat } from "lucide-react";

export function Header() {
  return (
    <header className="py-6 px-4 border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center gap-3">
        <div className="p-2.5 rounded-xl gradient-warm shadow-warm">
          <ChefHat className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-serif text-2xl font-bold text-foreground">
            PantryChef
          </h1>
          <p className="text-sm text-muted-foreground">
            Turn your ingredients into delicious meals
          </p>
        </div>
      </div>
    </header>
  );
}
