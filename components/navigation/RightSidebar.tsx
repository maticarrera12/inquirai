import ROUTES from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import TagCard from "../cards/TagCard";

const topQuestions = [
  {
    _id: "1",
    title: "¿Cómo puedo mejorar mis habilidades de programación?",
  },
  {
    _id: "2",
    title: "¿Cuáles son las mejores prácticas para escribir código limpio?",
  },
  {
    _id: "3",
    title: "¿Qué lenguajes de programación son más demandados en la industria?",
  },
  {
    _id: "4",
    title: "¿Cómo puedo prepararme para una entrevista técnica?",
  },
  {
    _id: "5",
    title:
      "¿Qué recursos recomiendan para aprender sobre inteligencia artificial?",
  },
];

const popularTags = [
    {_id: "1", title: "react", questions: 100},
    {_id: "2", title: "javascript", questions: 200},
    {_id: "3", title: "python", questions: 150},
    {_id: "4", title: "css3", questions: 80},
    {_id: "5", title: "html5", questions: 120},
]
const RightSidebar = () => {
  return (
    <section className="pt-36 custom-scrollbar background-light900_dark200 light-border sticky ring-0 top-0 flex h-screen w-[350px] flex-col gap-6 overflow-y-auto border-l p-6 shadow-light-300 dark:shadow-none max-xl:hidden lg:w-[266px]">
      <div>
        <h3 className="h3-bold text-dark200_light900">Preguntas destacadas</h3>

        <div className="mt-7 flex w-full flex-col gap-4">
          {topQuestions.map(({ _id, title }) => (
            <Link
              key={_id}
              href={ROUTES.PROFILE(_id)}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700">{title}</p>

              <Image
                src="/icons/chevron-right.svg"
                alt="chevron-right"
                width={20}
                height={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-16 ">
          <h3 className="h3-bold text-dark200_light900">Tags Populares</h3>
          <div className="mt-7 gap-4 flex flex-col">
            {
                popularTags.map(({ _id, title, questions }) => (
            <TagCard
              key={_id}
              _id={_id}
              name={title}
              questions={questions}
              showCount
              compact
            />
          ))}
          
          </div>
      </div>
    </section>
  );
};

export default RightSidebar;
