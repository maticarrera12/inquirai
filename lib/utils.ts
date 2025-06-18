import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { BADGE_CRITERIA } from "@/constants";
import { techMap } from "@/constants/techMap";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const techDescriptionMap: { [key: string]: string } = {
  javascript:
    "JavaScript es un lenguaje potente para crear aplicaciones web dinámicas, interactivas y modernas.",
  typescript:
    "TypeScript añade tipado fuerte a JavaScript, ideal para aplicaciones escalables y mantenibles.",
  react:
    "React es una biblioteca popular para construir interfaces de usuario rápidas y modulares.",
  nextjs:
    "Next.js es un framework de React para renderizado del lado del servidor y aplicaciones web optimizadas.",
  nodejs:
    "Node.js permite ejecutar JavaScript en el servidor, creando aplicaciones de red rápidas y escalables.",
  python:
    "Python es un lenguaje versátil conocido por su legibilidad y gran ecosistema, usado en ciencia de datos y automatización.",
  java: "Java es un lenguaje orientado a objetos, común en aplicaciones empresariales y desarrollo Android.",
  cplusplus:
    "C++ es un lenguaje de alto rendimiento, adecuado para software de sistemas, motores de juegos y aplicaciones complejas.",
  git: "Git es un sistema de control de versiones que rastrea cambios en el código fuente durante el desarrollo.",
  docker:
    "Docker es una plataforma de contenedores que simplifica el despliegue y la gestión de entornos de aplicaciones.",
  mongodb:
    "MongoDB es una base de datos NoSQL para manejar grandes volúmenes de datos flexibles y basados en documentos.",
  mysql:
    "MySQL es una base de datos relacional popular, conocida por su fiabilidad y facilidad de uso.",
  postgresql:
    "PostgreSQL es una base de datos relacional de código abierto, robusta y con funciones avanzadas.",
  aws: "AWS es una plataforma de nube integral que ofrece una amplia gama de servicios para despliegue, almacenamiento y más.",
};

export const getTechDescription = (techName: string) => {
  const normalizedTechName = techName.replace(/[ .]/g, "").toLowerCase();
  return techDescriptionMap[normalizedTechName]
    ? techDescriptionMap[normalizedTechName]
    : `${techName} es una tecnología o herramienta ampliamente utilizada en el desarrollo web, que ofrece características y capacidades valiosas.`;
};

export const getDeviconClassName = (techName: string) => {
  const normalizedTechName = techName.replace(/[ .]/g, "").toLowerCase();

  return techMap[normalizedTechName]
    ? `${techMap[normalizedTechName]} colored`
    : "devicon-devicon-plain";
};

export const getTimeStamp = (createdAt: Date): string => {
  const date = new Date(createdAt);
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
      return `hace ${interval} ${label}`;
    }
  }

  return "recien";
};

export const formatNumber = (number: number): string => {
  if (number >= 100000) {
    return (number / 1000000).toFixed(1) + "M";
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + "K";
  } else {
    return number.toString();
  }
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

export function assignBadges(params: {
  criteria: {
    type: keyof typeof BADGE_CRITERIA;
    count: number;
  }[];
}) {
  const badgeCounts: Badges = {
    GOLD: 0,
    SILVER: 0,
    BRONZE: 0,
  };

  const { criteria } = params;

  criteria.forEach((item) => {
    const { type, count } = item;
    const badgeLevels = BADGE_CRITERIA[type];

    Object.keys(badgeLevels).forEach((level) => {
      if (count >= badgeLevels[level as keyof typeof badgeLevels]) {
        badgeCounts[level as keyof Badges] += 1;
      }
    });
  });

  return badgeCounts;
}

export function processJobTitle(title: string | undefined | null): string {
  if (title === undefined || title === null) {
    return "No Job Title";
  }

  const words = title.split(" ");
  const validWords = words.filter((word) => {
    return (
      word !== undefined &&
      word !== null &&
      word.toLowerCase() !== "undefined" &&
      word.toLowerCase() !== "null"
    );
  });

  if (validWords.length === 0) {
    return "No Job Title";
  }
  const processedTitle = validWords.join(" ");
  return processedTitle;
}


