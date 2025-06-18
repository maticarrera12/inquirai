import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <section>

      <div className="flex flex-col-reverse sm:flex-row justify-between gap-4 sm:flex-grow sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Preguntas</h1>
        <Skeleton className="h-[46px] w-40 rounded-md" />
      </div>


      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <Skeleton className="h-14 flex-1" />
        <Skeleton className="h-14 w-44 hidden max-md:flex" />
      </div>


      <div className="mt-6 flex flex-wrap gap-3">
        {[1, 2, 3, 4, 5].map((item) => (
          <Skeleton key={item} className="h-10 w-28 rounded-md" />
        ))}
      </div>


      <div className="mt-10 flex w-full flex-col gap-6">
        {[...Array(5)].map((_, index) => (
          <Skeleton key={index} className="h-40 w-full rounded-xl" />
        ))}
      </div>


      <div className="mt-10 flex justify-center">
        <Skeleton className="h-10 w-32 rounded-md" />
      </div>
    </section>
  );
};

export default Loading;
