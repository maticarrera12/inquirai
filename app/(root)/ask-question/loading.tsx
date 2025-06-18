import { Skeleton } from "@/components/ui/skeleton";

const AskAQuestionLoading = () => {
  return (
    <section className="animate-pulse">
      <Skeleton className="h-12 w-72 mb-8" />

      <div className="mb-6">
        <Skeleton className="h-5 w-40 mb-2" />
        <Skeleton className="h-14 w-full rounded-md" />
      </div>

      <div className="mb-6">
        <Skeleton className="h-5 w-40 mb-2" />
        <Skeleton className="h-[300px] w-full rounded-md" />
      </div>

      <div className="mb-6">
        <Skeleton className="h-5 w-24 mb-2" />
        <Skeleton className="h-14 w-full rounded-md mb-2" />
        <div className="flex gap-2 flex-wrap">
          {[1, 2, 3].map((item) => (
            <Skeleton key={item} className="h-8 w-20 rounded-full" />
          ))}
        </div>
      </div>

      <div className="flex justify-end mt-10">
        <Skeleton className="h-12 w-44 rounded-md" />
      </div>
    </section>
  );
};

export default AskAQuestionLoading;
