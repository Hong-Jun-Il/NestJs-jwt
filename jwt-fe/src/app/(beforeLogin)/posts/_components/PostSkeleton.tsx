import { Skeleton } from "@/components/ui/skeleton";

export default function PostSkeleton() {
  return (
    <li className="h-full w-full">
      <Skeleton className="aspect-[16/9]" />
      <Skeleton className="mt-[10px] h-[30px] w-[150px]" />
      <Skeleton className="mt-[10px] h-[45px]" />
    </li>
  );
}
