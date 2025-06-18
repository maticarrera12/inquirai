import { Skeleton } from "@/components/ui/skeleton";

const QuestionDetailsLoading = () => {
  return (
    <section className="animate-pulse space-y-6">

      <div className="flex justify-between items-start w-full">

        <div className="flex items-center gap-2">
          <Skeleton className="size-[22px] rounded-full" />
          <Skeleton className="h-4 w-24 rounded-md" />
        </div>

        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </div>

      <Skeleton className="h-8 w-[80%] rounded-md" />

      <div className="flex flex-wrap gap-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-6 w-32 rounded-md" />
        ))}
      </div>

      <div className="space-y-2">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-4 w-full rounded-md" />
        ))}
      </div>

      <div className="flex gap-2 flex-wrap mt-3">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-6 w-20 rounded-full" />
        ))}
      </div>

      <div className="space-y-6 mt-10">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-4 w-24 rounded-md" />
            <Skeleton className="h-4 w-[70%] rounded-md" />
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-[60%] rounded-md" />
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-3">
        <Skeleton className="h-6 w-32 rounded-md" />
        <Skeleton className="h-24 w-full rounded-md" />
        <Skeleton className="h-10 w-32 rounded-md mt-2" />
      </div>
    </section>
  );
};

export default QuestionDetailsLoading;
