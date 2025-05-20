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

export const getTimeStamp = (date: Date): string => {
  const now = new Date();
  const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000);

  const units = [
    { label: "año", plural: "años", seconds: 31536000 },
    { label: "mes", plural: "meses", seconds: 2592000 },
    { label: "semana", plural: "semanas", seconds: 604800 },
    { label: "día", plural: "días", seconds: 86400 },
    { label: "hora", plural: "horas", seconds: 3600 },
    { label: "minuto", plural: "minutos", seconds: 60 },
    { label: "segundo", plural: "segundos", seconds: 1 },
  ];

  for (const unit of units) {
    const interval = Math.floor(secondsAgo / unit.seconds);
    if (interval >= 1) {
      const label = interval === 1 ? unit.label : unit.plural;
      return `${interval} ${label} atras`;
    }
  }

  return "1 segundo";
};


// export const getTimeStamp = (date: Date) => {
//   const now = new Date();
//   const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000);

//   const units = [
//     { label: "year", seconds: 31536000 },
//     { label: "month", seconds: 2592000 },
//     { label: "week", seconds: 604800 },
//     { label: "day", seconds: 86400 },
//     { label: "hour", seconds: 3600 },
//     { label: "minute", seconds: 60 },
//     { label: "second", seconds: 1 },
//   ];

//   for (const unit of units) {
//     const interval = Math.floor(secondsAgo / unit.seconds);
//     if (interval >= 1) {
//       return ${interval} ${unit.label}${interval > 1 ? "s" : ""} ago;
//     }
//   }
//   return "just now";
// };

