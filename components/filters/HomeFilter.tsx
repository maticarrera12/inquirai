// "use client";
// import { useState } from "react";
// import { Button } from "../ui/button";
// import { useRouter, useSearchParams } from "next/navigation";
// import { cn } from "@/lib/utils";
// import { formUrlQuery, removeKeysFromQuery } from "@/lib/url";

// const filters = [
//   { name: "React", value: "react" },
//   { name: "Javascript", value: "javascript" },
//     // { name: "Nuevo", value: "nuevo" },
//     // { name: "Popular", value: "popular" },
//     // { name: "Sin responder", value: "sin responder" },
//     // { name: "Recomendado", value: "recomendado" },
// ];
// const HomeFilter = () => {
// const router = useRouter();
//   const searchParams = useSearchParams();
//   const filterParams = searchParams.get("filter");
        
//     const [active, setActive] = useState(filterParams || "");

//   const handleTypeClick = (filter: string) => {
//     let newUrl = "";
//     if (filter === active) {
//       setActive("");
//       newUrl = removeKeysFromQuery({
//         params: searchParams.toString(),
//         keysToRemove: ["filter"],
//       });
//     } else {
//       setActive(filter);
//       newUrl = formUrlQuery({
//         params: searchParams.toString(),
//         key: "filter",
//         value: filter.toLowerCase(),
//       });
//     }

//     router.push(newUrl, { scroll: false });
//   };
//   return (
//     <div className="mt-10 hidden flex-wrap gap-3 sm:flex">
//       {filters.map((filter) => (
//         <Button
//           key={filter.name}
//           className={cn(
//             `body-medium rounded-lg shadow-none capitalize px-6 py-3"`,
//             active === filter.value
//               ? "bg-primary-100 hover:bg-primary-100  dark:bg-dark-400 dark:text-primary-500 dark:hover:bg-dark-500 "
//               : "bg-light-500 hover:bg-light-800 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-300 "
//           )}
//           onClick={() => handleTypeClick(filter.value)}
//         >
//           {filter.name}
//         </Button>
//       ))}
//     </div>
//   );
// };

// export default HomeFilter;

"use client";
import { useQueryState } from "nuqs";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const filters = [
  { name: "React", value: "react" },
  { name: "JavaScript", value: "javascript" },
];

const HomeFilter = () => {
  const [active, setActive] = useQueryState("filter", {
    defaultValue: "",
    parse: (value) => value as string,
    shallow: false,
  });

  const handleTypeClick = (value: string) => {
    setActive(active === value ? "" : value);
  };

  return (
    <div className="mt-10 hidden flex-wrap gap-3 sm:flex">
      {filters.map((filter) => (
        <Button
          key={filter.name}
          onClick={() => handleTypeClick(filter.value)}
          className={cn(
            `body-medium rounded-lg px-6 py-3 capitalize shadow-none`,
            active === filter.value
              ? "bg-primary-100 text-primary-500 hover:bg-primary-100 dark:bg-dark-400 dark:text-primary-500 dark:hover:bg-dark-400"
              : "bg-light-800 text-light-500 hover:bg-light-800 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-300"
          )}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilter;