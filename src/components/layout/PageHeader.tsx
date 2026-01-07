import React from 'react';

interface PageHeaderProps {
    title: React.ReactNode;
    subtitle?: string;
    children?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, children }) => {
    return (
        <div className="mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4 flex-shrink-0">
            <div>
                <h1 className="text-3xl font-bold text-white">{title}</h1>
                {subtitle && (
                    <p className="text-gray-400 font-medium">
                        {subtitle}
                    </p>
                )}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
                {children}
            </div>
        </div>
    );
};
