"use client";

import { Gifs } from "@/types";
import { Spinner } from "@heroui/react";
import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
import { twMerge } from "tailwind-merge";
import { Gif } from "./components/Gif";

type GifsProps = UseInfiniteQueryResult<InfiniteData<Gifs, unknown>, Error> & {
  scrollTriggerRef: (node?: Element | null) => void;
  inView: boolean;
  search?: string;
  related?: string;
};

export const GifsPage = ({
  data,
  hasNextPage,
  isFetchingNextPage,
  scrollTriggerRef,
  search,
  related,
  isError,
}: GifsProps) => {
  if (isError) {
    return (
      <div className="flex flex-1 justify-center items-center">
        <h3 className="text-2xl md:text-4xl font-semibold">
          Oops! Something went wrong.
        </h3>
      </div>
    );
  }

  if (!data?.pages) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Spinner
          size="lg"
          color="primary"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col self-center w-full max-w-[95rem] p-4 gap-4">
      <div className="">
        <h3
          className={twMerge(
            "text-2xl md:text-4xl font-semibold",
            related && "text-xl md:text-xl"
          )}
        >
          {search
            ? search.charAt(0).toUpperCase() + search.slice(1)
            : "Trending Now"}
        </h3>
        {related && <p className="text-gray-400">{related}</p>}
      </div>

      <div
        className="
          w-full items-center grid gap-3
          grid-cols-gifs auto-rows-gifs
          md:grid-cols-gifsMd md:auto-rows-gifsMd 
          grid-flow-row-dense"
      >
        {data.pages.map((page) =>
          page.data.map((gif) => (
            <Gif
              key={gif.id}
              {...gif}
            />
          ))
        )}
      </div>

      {hasNextPage ? (
        <div
          ref={scrollTriggerRef}
          className="w-full flex justify-center items-center pt-10 pb-40"
        >
          {isFetchingNextPage && (
            <Spinner
              size="lg"
              color="primary"
            />
          )}
        </div>
      ) : (
        <div className="w-full text-center text-gray-500 py-10 text-xl">
          <span>No more GIFs</span>
        </div>
      )}
    </div>
  );
};
