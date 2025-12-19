import { ChefHat, Sparkles, HelpCircle, LogIn, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuickTooltip } from "@/components/Tooltip";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface HeaderProps {
  onShowTour?: () => void;
}

export function Header({ onShowTour }: HeaderProps) {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out",
      description: "You have been signed out successfully.",
    });
  };

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
              The Kitchen
            </h1>
            <p className="text-sm text-muted-foreground font-medium hidden sm:block">
              Turn your ingredients into delicious meals
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <ThemeToggle />
          
          {onShowTour && (
            <QuickTooltip content="Take a tour" side="bottom">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onShowTour}
                className="text-muted-foreground hover:text-foreground"
              >
                <HelpCircle className="h-5 w-5" />
              </Button>
            </QuickTooltip>
          )}
          
          {!loading && (
            <>
              {user ? (
                <QuickTooltip content={`Signed in as ${user.email}`} side="bottom">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSignOut}
                    className="gap-2"
                  >
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">Sign Out</span>
                    <LogOut className="h-4 w-4 sm:hidden" />
                  </Button>
                </QuickTooltip>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/auth')}
                  className="gap-2"
                >
                  <LogIn className="h-4 w-4" />
                  <span className="hidden sm:inline">Sign In</span>
                </Button>
              )}
            </>
          )}
          
          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-accent/50 border border-accent-foreground/10">
            <Sparkles className="h-4 w-4 text-accent-foreground" />
            <span className="text-sm font-medium text-accent-foreground">AI-Powered Recipes</span>
          </div>
        </div>
      </div>
    </header>
  );
}
