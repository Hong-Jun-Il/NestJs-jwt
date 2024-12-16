import { PostType } from "@/types/PostType";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useGetPosts() {
  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: async ({
      pageParam,
    }: {
      pageParam: number;
    }): Promise<PostType[]> => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/posts?page=${pageParam}`,
      );

      if (!res.ok) {
        throw new Error("HTTP ERROR");
      }

      return res.json();
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPageParam !== 1 && lastPage.length !== 8) {
        return undefined;
      }

      return lastPageParam + 1;
    },
  });
}
