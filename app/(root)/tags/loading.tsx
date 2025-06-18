import { Skeleton } from "@/components/ui/skeleton";

const TagsLoading = () => {
  return (
    <section className="animate-pulse space-y-10">

      <Skeleton className="h-10 w-32" />


      <div className="flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <Skeleton className="h-14 w-full sm:w-[400px] rounded-md" />
        <Skeleton className="h-14 w-[170px] rounded-md" />
      </div>


      <div className="flex flex-wrap gap-4 mt-10">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-[220px] rounded-lg" />
        ))}
      </div>


      <div className="flex justify-center">
        <Skeleton className="h-10 w-40 rounded-md" />
      </div>
    </section>
  );
};

export default TagsLoading;
