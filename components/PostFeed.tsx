"use client";
import InfiniteScroll from "react-infinite-scroll-component";
import { Post } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";

import PostItem from "./PostItem";
import Spinner from "./Spinner";

interface PostFeedProps {
  userId?: string;
  currentUserId: string;
}
//userId is optional to get all posts if not provided
//if provided, get posts by userId
export default function PostFeed({ userId, currentUserId }: PostFeedProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState(true);
  const fetchPosts = useCallback(
    async (page: number) => {
      let data;
      if (userId) {
        data = await fetch(`/api/post/${userId}?page=${page}`);
      } else {
        data = await fetch(`/api/post?page=${page}`);
      }
      if (!data.ok) {
        throw new Error(`Error fetching posts: ${data.statusText}`);
      }

      data = await data?.json();

      setPosts((prevPosts) => [...prevPosts, ...data.posts]);
      setHasMore(page < data.totalPages);
    },
    [userId]
  );
  useEffect(() => {
    console.count("fetchPosts called");
    fetchPosts(page);
  }, [page, fetchPosts]);

  const fetchMoreData = () => {
    if (!hasMore) return;
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchMoreData}
      hasMore={hasMore}
      style={{ overflowY: "scroll", height: "100%" }}
      loader={<Spinner />}
      endMessage={
        <p className="text-center text-muted-foreground">
          No more posts to show
        </p>
      }
    >
      <div className="">
        {posts?.map((post) => (
          // @ts-ignore
          <PostItem key={post.id} post={post} currentUserId={currentUserId} />
        ))}
      </div>
    </InfiniteScroll>
  );
}
