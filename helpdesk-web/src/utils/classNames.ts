/**
 * Combines multiple class names into a single string, filtering out falsy values.
 * 
 * @param classes - Array of class names or conditional class names
 * @returns A string of combined class names
 */
export function classNames(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
