import React from 'react';
import { cn } from '../../lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    id?: string;
}

export const Section: React.FC<SectionProps> = ({
    className,
    children,
    id,
    ...props
}) => {
    return (
        <section
            id={id}
            className={cn("py-20 md:py-28 lg:py-32 relative overflow-hidden", className)}
            {...props}
        >
            {children}
        </section>
    );
};
