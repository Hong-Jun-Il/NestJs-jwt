"use client";

import { useGetPosts } from "@/hooks/queries";
import style from "./postList.module.scss";
import Post from "../../_components/Post";
import { Skeleton } from "@/components/ui/skeleton";

export default function PostList() {
  const { data, isLoading } = useGetPosts();

  return (
    <>
      <ul className={style.postListWrapper}>
        <Skeleton className="h-[50px] w-[120px]" />
        {/* {isLoading ? (
          <Skeleton />
        ) : (
          <>{data?.pages.flat(2).map((e) => <Post key={e.id} data={e} />)}</>
        )} */}
      </ul>
      <div />
    </>
  );
}
