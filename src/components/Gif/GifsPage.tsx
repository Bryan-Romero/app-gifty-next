"use client";

import { useAllIDsFavorites } from "@/hooks";
import { Gifs } from "@/types";
import { Spinner } from "@heroui/react";
import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
import { Gif } from "./components/Gif";

type GifsProps = UseInfiniteQueryResult<InfiniteData<Gifs, unknown>, Error> & {
  scrollTriggerRef: (node?: Element | null) => void;
  inView: boolean;
  tittle?: string;
  subTittle?: string;
};

export const GifsPage = ({
  data,
  hasNextPage,
  isFetchingNextPage,
  scrollTriggerRef,
  tittle,
  subTittle,
  isError,
}: GifsProps) => {
  const { data: favoritesIDs } = useAllIDsFavorites();
  const hasGifs = data?.pages.some((page) => page?.data.length > 0);

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
    <div className="flex-1 flex flex-col self-center w-full max-w-[90rem] p-4 gap-4">
      <div className="">
        {tittle && (
          <h3 className="text-2xl md:text-4xl font-semibold">
            {tittle.charAt(0).toUpperCase() + tittle.slice(1)}
          </h3>
        )}

        {subTittle && <p className="text-gray-400">{subTittle}</p>}
      </div>

      <div
        className="
          w-full items-center grid gap-3
          grid-cols-gifs auto-rows-gifs 
          md:grid-cols-gifs-md md:auto-rows-gifs-md
          grid-flow-row-dense"
      >
        {data.pages.map((page) =>
          page.data.map((gif) => (
            <Gif
              key={gif.id}
              isInFavorites={favoritesIDs.includes(gif.id)}
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
      ) : hasGifs ? (
        <div className="w-full text-center text-gray-500 py-10 text-xl">
          <span>No more GIFs</span>
        </div>
      ) : (
        <div className="w-full flex-1 flex justify-center items-center text-center text-gray-500 py-10 text-2xl font-semibold">
          <span>No GIFs</span>
        </div>
      )}
    </div>
  );
};
