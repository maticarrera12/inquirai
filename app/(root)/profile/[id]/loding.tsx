import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <section className="animate-pulse space-y-10">

      <div className="flex flex-col-reverse justify-between sm:flex-row gap-6">
        <div className="flex flex-col sm:flex-row gap-6">
          <Skeleton className="size-[140px] rounded-full" />

          <div className="space-y-3">
            <Skeleton className="h-8 w-60" />
            <Skeleton className="h-5 w-32" />

            <div className="flex gap-3 mt-4">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-32" />
            </div>

            <Skeleton className="h-20 w-full max-w-xl mt-6" />
          </div>
        </div>

        <Skeleton className="h-12 w-44 rounded-md self-start sm:self-auto" />
      </div>


      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>


      <div className="flex gap-10 mt-10">

        <div className="flex-[2] space-y-6">
          <div className="flex gap-4">
            <Skeleton className="h-10 w-24 rounded-md" />
            <Skeleton className="h-10 w-24 rounded-md" />
          </div>

          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-lg" />
          ))}
        </div>


        <div className="hidden max-lg:hidden flex-1 min-w-[250px] space-y-4">
          <Skeleton className="h-6 w-32" />

          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-md" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Loading;
