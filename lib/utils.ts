import { techMap } from "@/constants/techMap";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getDeviconClassName = (techName: string) => {  
  const normailzedTechName = techName.replace(/[ .]/g,"").toLowerCase();


  return techMap[normailzedTechName]
  ? `${techMap[normailzedTechName]} colored`
  : "devicon-devicon-plain";

}
