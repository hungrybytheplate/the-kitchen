import { motion, AnimatePresence, HTMLMotionProps, Variants, Transition } from "framer-motion";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

// Animation variants
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 }
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 }
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -10 }
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 10 }
};

// Staggered container
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

// Stagger item
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 24
    }
  }
};

// Spring transition configs
export const springTransition: Transition = {
  type: "spring" as const,
  stiffness: 400,
  damping: 30
};

export const gentleSpring: Transition = {
  type: "spring" as const,
  stiffness: 200,
  damping: 20
};

// Animated Card wrapper with hover effects
interface AnimatedCardProps extends HTMLMotionProps<"div"> {
  hoverScale?: number;
  hoverY?: number;
}

export const AnimatedCard = forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ className, hoverScale = 1.02, hoverY = -4, children, ...props }, ref) => (
    <motion.div
      ref={ref}
      className={cn("cursor-pointer", className)}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={scaleIn}
      whileHover={{ 
        scale: hoverScale, 
        y: hoverY,
      }}
      whileTap={{ scale: 0.98 }}
      transition={gentleSpring}
      {...props}
    >
      {children}
    </motion.div>
  )
);
AnimatedCard.displayName = "AnimatedCard";

// Animated list container
interface AnimatedListProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
}

export const AnimatedList = forwardRef<HTMLDivElement, AnimatedListProps>(
  ({ className, children, ...props }, ref) => (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      {...props}
    >
      {children}
    </motion.div>
  )
);
AnimatedList.displayName = "AnimatedList";

// Animated list item
export const AnimatedListItem = forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ className, children, ...props }, ref) => (
    <motion.div
      ref={ref}
      className={className}
      variants={staggerItem}
      {...props}
    >
      {children}
    </motion.div>
  )
);
AnimatedListItem.displayName = "AnimatedListItem";

// Page transition wrapper
interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

// Animated button press effect
export const buttonTap = {
  scale: 0.95,
};

// Heart animation for save button
export const heartBeat = {
  scale: 0.9,
};

// Export AnimatePresence for convenience
export { AnimatePresence, motion };
