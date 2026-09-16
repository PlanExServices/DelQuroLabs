import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Compose conditional class names and resolve conflicting Tailwind utilities.
 *
 * Every component in the suite imports `cn` from `@/utils/cn`, e.g.
 *   cn("base classes", isOpen ? "text-white" : "text-mist-200", className)
 *
 * `clsx` handles the conditional/array/object input, `twMerge` makes sure a
 * later utility wins over an earlier one from the same group (so callers can
 * override a component's default classes via `className`).
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export default cn;
