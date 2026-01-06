'use client'

import { Spinner } from '@heroui/react'
import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query'

import { useAllIDsFavorites } from '@/hooks'
import { Gifs } from '@/types'
import { Gif } from './components/Gif'

type GifsProps = UseInfiniteQueryResult<InfiniteData<Gifs, unknown>, Error> & {
  scrollTriggerRef: (node?: Element | null) => void
  inView: boolean
  title?: string
  subTitle?: string
  firstGifPriority?: boolean
}

export const GifsPage = ({
  data,
  hasNextPage,
  isFetchingNextPage,
  scrollTriggerRef,
  title,
  subTitle,
  isError,
  firstGifPriority,
}: GifsProps) => {
  const { data: favoritesIDs } = useAllIDsFavorites()
  const hasGifs = data?.pages.some((page) => page?.data.length > 0)

  if (isError) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-2xl font-semibold md:text-4xl">Oops! Something went wrong.</p>
      </div>
    )
  }

  if (!data?.pages) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Spinner color="primary" size="lg" />
      </div>
    )
  }

  return (
    <div className="flex w-full max-w-360 flex-1 flex-col gap-4 self-center p-4">
      <div className="">
        {title && (
          <h1 className="text-2xl font-semibold md:text-4xl">{title.charAt(0).toUpperCase() + title.slice(1)}</h1>
        )}

        {subTitle && <h2 className="text-gray-400">{subTitle}</h2>}
      </div>

      <div className="grid-cols-gifs auto-rows-gifs md:grid-cols-gifs-md md:auto-rows-gifs-md grid w-full grid-flow-row-dense items-center gap-3">
        {data.pages.map((page) =>
          page.data.map((gif, idx) => (
            <Gif
              key={gif.id}
              fetchPriorityHigh={firstGifPriority && idx === 0}
              isInFavorites={favoritesIDs.includes(gif.id)}
              {...gif}
            />
          ))
        )}
      </div>

      {hasNextPage ? (
        <div ref={scrollTriggerRef} className="flex w-full items-center justify-center pt-10 pb-40">
          {isFetchingNextPage && <Spinner color="primary" size="lg" />}
        </div>
      ) : hasGifs ? (
        <div className="w-full py-10 text-center text-xl text-gray-500">
          <span>No more GIFs</span>
        </div>
      ) : (
        <div className="flex w-full flex-1 items-center justify-center py-10 text-center text-2xl font-semibold text-gray-500">
          <span>No GIFs</span>
        </div>
      )}
    </div>
  )
}
