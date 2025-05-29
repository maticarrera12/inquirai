// "use client";
// import React, { useEffect, useState } from "react";
// import { Input } from "../ui/input";
// import Image from "next/image";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { formUrlQuery, removeKeysFromQuery } from "@/lib/url";


// interface Props {
//   route: string;
//   imgSrc: string;
//   placeholder: string;
//   otherClasses?: string;
// }

// const LocalSearch = ({ route, imgSrc, placeholder, otherClasses }: Props) => {
//     const pathname = usePathname()
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const query = searchParams.get("query") || "";

//   const [searchQuery, setSearchQuery] = useState(query);

//   useEffect(() => {

//     const delayDebounceFn = setTimeout(()=>{
//        if (searchQuery) {
//       const newUrl = formUrlQuery({
//         params: searchParams.toString(),
//         key: "query",
//         value: searchQuery,
//       });

//       router.push(newUrl, { scroll: false });
//     }else{
//         if(pathname === route){
//             const newUrl = removeKeysFromQuery({
//                 params: searchParams.toString(),
//                 keysToRemove: ['query']
//             })

//             router.push(newUrl, {scroll:false})
//         }
//     }
//     }, 500)
//     return()=> clearTimeout(delayDebounceFn)
//   }, [searchQuery, router, route, searchParams]);
//   return (
//     <div
//       className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
//     >
//       <Image
//         src={imgSrc}
//         width={24}
//         height={24}
//         alt="Buscar"
//         className="cursor-pointer"
//       />
//       <Input
//         type="text"
//         placeholder={placeholder}
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         className="!bg-transparent paragraph-regular no-focus placeholder text-dark400_light700 border-none shadow-none outline-none"
//       ></Input>
//     </div>
//   );
// };

// export default LocalSearch;
"use client";
import Image from "next/image";
import { useQueryState } from "nuqs";
import React, { useEffect, useState } from "react";



import { Input } from "../ui/input";
import { useDebounce } from "@/hooks/useDebounce";

interface LocalSearchProps {
    route: string;
    imgSrc: string;
    placeholder: string;
    otherClasses?: string;
    iconPosition?: "left" | "right";
}

const LocalSearch = ({
    route,
    imgSrc,
    placeholder,
    otherClasses,
    iconPosition = "left",
}: LocalSearchProps) => {
    const [inputValue, setInputValue] = useState("");
    const [_, setSearchQuery] = useQueryState("query", {
        defaultValue: "",
        shallow: false,
    });

    const debouncedValue = useDebounce(inputValue);

    useEffect(() => {
        setSearchQuery(debouncedValue);
    }, [debouncedValue, setSearchQuery]);

    return (
        <div
            className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
        >
           {iconPosition === 'left' && <Image
                src={imgSrc}
                width={24}
                height={24}
                alt="search"
                className="cursor-pointer"
            />
           }
            <Input
                type="text"
                placeholder={placeholder}
                onChange={(e) => {
                    setInputValue(e.target.value);
                }}
                value={inputValue}
                className="dark:bg-background-light800_darkgradient paragraph-regular no-focus placeholder text-dark400_light700 border-none shadow-none outline-none"
            />
             {iconPosition === 'right' && <Image
                src={imgSrc}
                width={15}
                height={15}
                alt="search"
                className="cursor-pointer"
            />
           }
        </div>
    );
};

export default LocalSearch;