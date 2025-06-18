import { Skeleton } from "@/components/ui/skeleton";

const CollectionLoading = () => {
  return (
    <section className="animate-pulse space-y-6">
      <Skeleton className="h-10 w-72 rounded-md" />

      <div className="mt-6 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <Skeleton className="h-12 w-full sm:w-[70%] rounded-md" />
        <Skeleton className="h-12 w-[170px] rounded-md" />
      </div>

      <div className="mt-10 flex flex-col gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-6 w-32 rounded-md" />
            <Skeleton className="h-6 w-[90%] rounded-md" />
            <div className="flex gap-2 mt-2">
              {[...Array(2)].map((_, j) => (
                <Skeleton key={j} className="h-6 w-16 rounded-full" />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <Skeleton className="h-10 w-40 rounded-md" />
      </div>
    </section>
  );
};

export default CollectionLoading;
