// src/components/ui/card.tsx
import React from "react";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export const Card: React.FC<Props> = ({ children, className = "" }) => {
  return (
    <div className={`bg-zinc-900 rounded-2xl shadow-sm ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<Props> = ({ children, className = "" }) => {
  return (
    <div className={`px-4 py-3 border-b border-white/5 ${className}`}>
      {children}
    </div>
  );
};

export const CardContent: React.FC<Props> = ({ children, className = "" }) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};
