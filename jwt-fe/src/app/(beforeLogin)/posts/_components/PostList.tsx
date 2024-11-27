"use client";

import { useGetPosts } from "@/hooks/queries";
import style from "./postList.module.scss";
import Image from "next/image";
import PostSkeleton from "./PostSkeleton";
import { useCallback, useRef } from "react";

export default function PostList() {
  const {
    data,
    isLoading,
    isFetchingNextPage,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useGetPosts();
  const renderer = useRef<IntersectionObserver | null>(null);
  const scrollPosition = useRef(0); // 스크롤 위치를 저장

  const loader = useCallback(
    (node: HTMLUListElement) => {
      if (renderer.current) {
        renderer.current.disconnect();
      }

      renderer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          if (isFetchingNextPage || isFetching) return;

          scrollPosition.current = window.scrollY;

          setTimeout(() => {
            fetchNextPage();
          }, 1500);
        }
      });

      if (node) {
        renderer.current.observe(node);
      }
    },
    [renderer, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage],
  );

  return (
    <>
      <ul className={style.postListWrapper}>
        {isLoading ? (
          <>
            {Array.from({ length: 16 }).map((_, i) => (
              <PostSkeleton key={i} />
            ))}
          </>
        ) : (
          <>
            {data?.pages.flat(2).map((e) => (
              <li key={e.id}>
                <div className={style.imgWrapper}>
                  <Image src={e.img} alt="img" fill sizes="100%" priority />
                </div>
                <div className={style.infoSection}>
                  <h2>{e.title}</h2>
                  <p>{e.content}</p>
                </div>
              </li>
            ))}
          </>
        )}
      </ul>
      {hasNextPage && (
        <ul className={style.postListWrapper} ref={loader}>
          {Array.from({ length: 8 }).map((_, i) => (
            <PostSkeleton key={i} />
          ))}
        </ul>
      )}
    </>
  );
}
