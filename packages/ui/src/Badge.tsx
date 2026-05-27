import type { ReactNode } from 'react';
import { cn } from './cn';

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-accent px-1.5 text-[10px] font-bold text-white',
        className,
      )}
    >
      {children}
    </span>
  );
}
