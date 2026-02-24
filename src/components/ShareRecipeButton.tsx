import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Share2, Link, MessageCircle, Mail, Check } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "@/hooks/use-toast";

interface ShareableItem {
  id: string;
  title: string;
  description: string;
}

interface ShareRecipeButtonProps {
  recipe: ShareableItem;
  variant?: "ghost" | "outline" | "default";
  size?: "sm" | "default" | "icon";
  className?: string;
}

export function ShareRecipeButton({ recipe, variant = "ghost", size = "sm", className }: ShareRecipeButtonProps) {
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const didLongPress = useRef(false);
  
  const getShareUrl = () => {
    const baseUrl = window.location.origin;
    return `${baseUrl}?recipe=${recipe.id}`;
  };
  
  const getShareText = () => {
    return `Check out this recipe: ${recipe.title} - ${recipe.description}`;
  };
  
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(getShareUrl());
      setCopied(true);
      toast({
        title: "Link copied!",
        description: `Share link for "${recipe.title}" copied to clipboard`,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };
  
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: recipe.title,
          text: getShareText(),
          url: getShareUrl(),
        });
      } catch (e) {
        if ((e as Error).name !== 'AbortError') {
          console.error('Share failed:', e);
        }
      }
    }
  };
  
  const handleEmailShare = () => {
    const subject = encodeURIComponent(`Recipe: ${recipe.title}`);
    const body = encodeURIComponent(`${getShareText()}\n\n${getShareUrl()}`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };
  
  const handleSmsShare = () => {
    const text = encodeURIComponent(`${getShareText()} ${getShareUrl()}`);
    window.open(`sms:?body=${text}`);
  };
  
  // On mobile, use native share directly
  const supportsNativeShare = typeof navigator !== 'undefined' && navigator.share;
  
  if (supportsNativeShare) {
    return (
      <Button
        variant={variant}
        size={size}
        className={className}
        onClick={(e) => {
          e.stopPropagation();
          handleNativeShare();
        }}
      >
        <Share2 className="h-4 w-4" />
        {size !== "icon" && <span className="ml-1.5">Share</span>}
      </Button>
    );
  }
  
  // On desktop: single click = copy link, dropdown for more options
  return (
    <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
        <Button 
          variant={variant} 
          size={size} 
          className={className}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            // Single click = copy link immediately
            handleCopyLink();
          }}
          onPointerDown={(e) => {
            e.stopPropagation();
            didLongPress.current = false;
            holdTimerRef.current = setTimeout(() => {
              didLongPress.current = true;
              setMenuOpen(true);
            }, 500);
          }}
          onPointerUp={(e) => {
            e.stopPropagation();
            if (holdTimerRef.current) {
              clearTimeout(holdTimerRef.current);
              holdTimerRef.current = null;
            }
          }}
          onPointerLeave={() => {
            if (holdTimerRef.current) {
              clearTimeout(holdTimerRef.current);
              holdTimerRef.current = null;
            }
          }}
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Share2 className="h-4 w-4" />
          )}
          {size !== "icon" && <span className="ml-1.5">{copied ? "Copied!" : "Share"}</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-popover z-50" onClick={(e) => e.stopPropagation()}>
        <DropdownMenuItem onClick={handleCopyLink} className="cursor-pointer">
          {copied ? (
            <Check className="h-4 w-4 mr-2 text-green-500" />
          ) : (
            <Link className="h-4 w-4 mr-2" />
          )}
          {copied ? "Copied!" : "Copy link"}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleEmailShare} className="cursor-pointer">
          <Mail className="h-4 w-4 mr-2" />
          Share via email
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSmsShare} className="cursor-pointer">
          <MessageCircle className="h-4 w-4 mr-2" />
          Share via text
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
