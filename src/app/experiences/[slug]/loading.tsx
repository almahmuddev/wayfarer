import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <Navbar />
      <main className="container py-10">
        <Skeleton className="aspect-[16/9] w-full rounded-xl" />

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="space-y-3">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-9 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
          <Skeleton className="h-80 w-full rounded-xl" />
        </div>
      </main>
      <Footer />
    </>
  );
}
