import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function RecipeCardSkeleton() {
  return (
    <Card className="overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm">
      <CardHeader className="p-3 sm:pb-3 sm:p-6">
        <div className="flex items-start justify-between gap-2 sm:gap-3">
          <div className="flex-1 space-y-2 sm:space-y-3">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Skeleton className="h-5 sm:h-6 w-16 sm:w-20 rounded-full" />
              <Skeleton className="h-5 sm:h-6 w-14 sm:w-16 rounded-full" />
            </div>
            <Skeleton className="h-5 sm:h-7 w-3/4" />
            <Skeleton className="h-3 sm:h-4 w-full" />
            <Skeleton className="h-3 sm:h-4 w-2/3" />
          </div>
          <Skeleton className="h-8 w-8 sm:h-10 sm:w-10 rounded-full shrink-0" />
        </div>

        <div className="flex items-center gap-2 sm:gap-4 mt-2.5 sm:mt-4">
          <Skeleton className="h-6 sm:h-8 w-16 sm:w-20 rounded-full" />
          <Skeleton className="h-6 sm:h-8 w-20 sm:w-24 rounded-full" />
        </div>

        <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-2.5 sm:mt-4">
          <Skeleton className="h-5 sm:h-6 w-14 sm:w-16 rounded-full" />
          <Skeleton className="h-5 sm:h-6 w-12 sm:w-14 rounded-full" />
          <Skeleton className="h-5 sm:h-6 w-16 sm:w-20 rounded-full" />
        </div>
      </CardHeader>

      <CardContent className="pt-0 px-3 pb-3 sm:px-6 sm:pb-6 space-y-2 sm:space-y-3">
        <Skeleton className="h-8 sm:h-9 w-full rounded-lg sm:rounded-xl" />
        <Skeleton className="h-9 sm:h-10 w-full rounded-lg sm:rounded-xl" />
      </CardContent>
    </Card>
  );
}

export function RecipeCardSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <RecipeCardSkeleton key={i} />
      ))}
    </>
  );
}
