import { Star } from "lucide-react";
import { cn } from "./cn";

interface RatingProps {
  value: number;
  count?: number;
  size?: number;
  hideValue?: boolean;
  className?: string;
}

export function Rating({
  value,
  count,
  size = 14,
  hideValue = false,
  className,
}: RatingProps) {
  const normalized = Math.max(0, Math.min(5, value));
  const rounded = Math.round(normalized * 2) / 2;
  const label = count !== undefined
    ? `${normalized.toFixed(2)} de 5 (${count} avaliações)`
    : `${normalized.toFixed(2)} de 5`;

  return (
    <div
      role="img"
      aria-label={label}
      className={cn("inline-flex items-center gap-1", className)}
    >
      <div className="flex" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = rounded >= i + 1;
          const half = !filled && rounded >= i + 0.5;
          if (half) {
            return (
              <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
                <Star
                  className="absolute inset-0 text-yellow-400"
                  style={{ width: size, height: size }}
                  strokeWidth={1.5}
                />
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: size / 2 }}
                >
                  <Star
                    className="text-yellow-400"
                    style={{ width: size, height: size }}
                    fill="currentColor"
                    strokeWidth={1.5}
                  />
                </span>
              </span>
            );
          }
          return (
            <Star
              key={i}
              className={filled ? "text-yellow-400" : "text-gray-300"}
              style={{ width: size, height: size }}
              fill={filled ? "currentColor" : "none"}
              strokeWidth={1.5}
            />
          );
        })}
      </div>
      {!hideValue && (
        <span className="text-[11px] font-medium text-ink-muted">
          {normalized.toFixed(1)}
          {count !== undefined && (
            <span className="ml-0.5 text-ink-muted/70">({count})</span>
          )}
        </span>
      )}
    </div>
  );
}
