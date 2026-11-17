export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(pathname: string): string {
  if (!pathname.startsWith("/")) return `${BASE_PATH}/${pathname}`;
  return `${BASE_PATH}${pathname}`;
}
