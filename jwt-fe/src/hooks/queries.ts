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
      if (lastPage.length !== 8) {
        return undefined;
      }

      return lastPageParam + 1;
    },
  });
}

export async function getAnalitics() {
  const res = await fetch("http://localhost:5173/analysis");

  if (!res.ok) {
    throw new Error("HTTP ERROR");
  }

  return res.json();
}
