/** Tiny className joiner — avoids pulling in a dependency for string concatenation. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
