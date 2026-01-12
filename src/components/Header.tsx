import { UtensilsCrossed, Wine, HelpCircle, LogIn, LogOut, User, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuickTooltip } from "@/components/Tooltip";
import { ThemeToggle } from "@/components/ThemeToggle";
import { UserPreferencesDialog } from "@/components/UserPreferencesDialog";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

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
    <motion.header 
      className="py-3 sm:py-5 px-3 sm:px-4 border-b border-border/30 glass sticky top-0 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
        <motion.div 
          className="flex items-center gap-2 sm:gap-4 min-w-0"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          <div className="relative shrink-0">
            <div className="absolute inset-0 gradient-warm blur-xl opacity-30 animate-pulse-soft" />
            <motion.div 
              className="relative p-2 sm:p-3 rounded-xl sm:rounded-2xl gradient-warm shadow-warm"
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <UtensilsCrossed className="h-5 w-5 sm:h-7 sm:w-7 text-primary-foreground" />
            </motion.div>
          </div>
          <div className="min-w-0">
            <h1 className="font-serif text-lg sm:text-2xl md:text-3xl font-bold text-foreground tracking-tight truncate">
              The Kitchen
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium hidden sm:block">
              Fresh recipes from your ingredients
            </p>
          </div>
        </motion.div>
        
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <ThemeToggle />
          
          {user && (
            <UserPreferencesDialog
              trigger={
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground h-8 w-8 sm:h-9 sm:w-9"
                  aria-label="Preferences"
                >
                  <Settings2 className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              }
            />
          )}
          
          {onShowTour && (
            <QuickTooltip content="Take a tour" side="bottom">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onShowTour}
                className="text-muted-foreground hover:text-foreground h-8 w-8 sm:h-9 sm:w-9"
                aria-label="Take a tour"
              >
                <HelpCircle className="h-4 w-4 sm:h-5 sm:w-5" />
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
                    aria-label="Sign out"
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
            <Wine className="h-4 w-4 text-accent-foreground" />
            <span className="text-sm font-medium text-accent-foreground">Fresh & Simple</span>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
