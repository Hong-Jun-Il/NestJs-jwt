"use client";

import { useGetPosts } from "@/hooks/queries";

export default function PostList() {
  const test = useGetPosts();
  console.log(test);
  return <div>PostList</div>;
}
