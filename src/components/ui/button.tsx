import React from 'react';
import { cn } from '../../lib/utils';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg' | 'icon';
}

type CombinedProps = ButtonProps & HTMLMotionProps<"button">;

const Button = React.forwardRef<HTMLButtonElement, CombinedProps>(({
    className,
    variant = 'primary',
    size = 'md',
    children,
    ...props
}, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";

    const variants = {
        primary: "bg-secondary text-white hover:bg-secondary/90 shadow-lg shadow-secondary/20",
        secondary: "bg-primary text-white hover:bg-primary/90",
        outline: "border border-input hover:bg-slate-100 hover:text-accent-foreground text-slate-700",
        ghost: "hover:bg-slate-100 hover:text-accent-foreground text-slate-600",
    } as const;

    const sizes = {
        sm: "h-9 px-3 rounded-md text-xs",
        md: "h-11 px-8 py-2 text-sm",
        lg: "h-12 px-10 text-base",
        icon: "h-9 w-9",
    } as const;

    return (
        <motion.button
            ref={ref}
            whileTap={{ scale: 0.98 }}
            className={cn(
                baseStyles,
                variants[variant as keyof typeof variants],
                sizes[size as keyof typeof sizes],
                className
            )}
            {...props}
        >
            {children}
        </motion.button>
    );
});
Button.displayName = "Button";

export { Button };
