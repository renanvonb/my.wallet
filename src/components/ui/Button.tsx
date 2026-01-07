import React from 'react';
import { cn } from '../../lib/utils';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

// Omit 'onAnimationStart', 'onDrag', etc from standard button props if conflict, but merging with HTMLMotionProps<"button"> is better.
// We will use a simple approach: if it's motion, we use motion.button.

type CombinedProps = ButtonProps & HTMLMotionProps<"button">;

export const Button: React.FC<CombinedProps> = ({
    className,
    variant = 'primary',
    size = 'md',
    children,
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";

    const variants = {
        primary: "bg-secondary text-white hover:bg-secondary/90 shadow-lg shadow-secondary/20",
        secondary: "bg-primary text-white hover:bg-primary/90",
        outline: "border border-input hover:bg-slate-100 hover:text-accent-foreground text-slate-700",
        ghost: "hover:bg-slate-100 hover:text-accent-foreground text-slate-600",
    };

    const sizes = {
        sm: "h-9 px-3 rounded-md text-xs",
        md: "h-11 px-8 py-2 text-sm",
        lg: "h-12 px-10 text-base",
    };

    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            {...props}
        >
            {children}
        </motion.button>
    );
};
