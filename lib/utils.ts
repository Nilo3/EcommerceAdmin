import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// min 6.31.37
export const formatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS"
});


