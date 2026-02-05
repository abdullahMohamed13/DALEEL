import { Star } from "@mynaui/icons-react";
import { cn } from "@/lib/utils";

function StarIcon({ filled }: { filled?: boolean }) {
  return (
    <Star
      className={cn(
        "size-5 shrink-0",
        filled ? "text-amber-500" : "text-border",
      )}
      fill="currentColor"
    />
  );
}

export default function Basic() {
  return (
    <div className="flex">
      <button
        className="appearance-none"
        type="button"
        aria-label="Star 1 out of 5"
      >
        <StarIcon filled />
      </button>
      <button
        className="appearance-none"
        type="button"
        aria-label="Star 2 out of 5"
      >
        <StarIcon filled />
      </button>
      <button
        className="appearance-none"
        type="button"
        aria-label="Star 3 out of 5"
      >
        <StarIcon filled />
      </button>
      <button
        className="appearance-none"
        type="button"
        aria-label="Star 4 out of 5"
      >
        <StarIcon />
      </button>
      <button
        className="appearance-none"
        type="button"
        aria-label="Star 5 out of 5"
      >
        <StarIcon />
      </button>
    </div>
  );
}

export function StarRating({ value = 5 }: { value: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} filled={i < value} />
      ))}
    </div>
  )
}