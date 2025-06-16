import Image from "next/image";
import Link from "next/link";
import ROUTES from "@/constants/routes";
import { getHotQuestions } from "@/lib/actions/question.action";
import DataRenderer from "../DataRenderer";
import { getTopTags } from "@/lib/actions/tag.action";
import TagCard from "../cards/TagCard";

const popularTags = [
  { _id: "1", title: "react", questions: 100 },
  { _id: "2", title: "javascript", questions: 200 },
  { _id: "3", title: "python", questions: 150 },
  { _id: "4", title: "css3", questions: 80 },
  { _id: "5", title: "html5", questions: 120 },
];
const RightSidebar = async () => {
  const { success, data: hotQuestions, error } = await getHotQuestions();
  const {
    success: tagSuccess,
    data: tags,
    error: tagError,
  } = await getTopTags();
  return (
    <section className="pt-36 custom-scrollbar background-light900_dark200 light-border sticky ring-0 top-0 flex h-screen w-[350px] flex-col gap-6 overflow-y-auto border-l p-6 shadow-light-300 dark:shadow-none max-xl:hidden lg:w-[266px]">
      <div>
        <h3 className="h3-bold text-dark200_light900">Preguntas destacadas</h3>

        <div className="mt-7 flex w-full flex-col gap-4">
          <DataRenderer
            data={hotQuestions}
            empty={{
              title: "No hay preguntas destacadas",
              message:
                "No hay preguntas destacadas en este momento. Vuelve más tarde para ver las preguntas más populares.",
            }}
            success={success}
            error={error}
            render={(hotQuestions) => (
              <div className="mt-7 flex w-full flex-col gap-8">
                {hotQuestions.map(({ _id, title }) => (
                  <Link
                    key={_id}
                    href={ROUTES.QUESTION(_id)}
                    className="flex cursor-pointer items-center justify-between gap-7"
                  >
                    <p className="body-medium text-dark500_light700 line-clamp-2">
                      {title}
                    </p>

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
            )}
          />
          <DataRenderer
            data={tags}
            empty={{
              title: "No encontramos etiquetas",
              message:
                "No hay etiquetas populares en este momento. Vuelve más tarde para ver las etiquetas más populares.",
            }}
            success={tagSuccess}
            error={tagError}
            render={(tags) => <div className="mt-7 flex flex-col gap-4">
              {
                tags.map(({ _id, name, questions }) => (
                  <TagCard
                  key={_id}
                  _id={_id}
                  name={name}
                  showCount
                  compact
                  questions={questions}
                  />
                ))
              }
            </div>}
          />
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
