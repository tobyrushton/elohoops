import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getNBAImageUrl = (id: number): string =>
  `https://cdn.nba.com/headshots/nba/latest/260x190/${id}.png`
