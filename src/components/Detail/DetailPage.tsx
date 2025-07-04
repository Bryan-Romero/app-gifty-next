'use client'

import { Image, Spinner } from '@heroui/react'

import { useAllIDsFavorites, useGifByID, useGifsRelated } from '@/hooks'
import { GifsPage } from '../Gif/GifsPage'
import { ButtonsSection } from './components/ButtonsSection'
import { UserSection } from './components/UserSection'

interface Props {
  gif_id: string
}

export default function DetailPage({ gif_id }: Props) {
  const { data: favoritesIDs } = useAllIDsFavorites()
  const { gif, isLoading, isError } = useGifByID(gif_id)
  const data = useGifsRelated(gif_id)

  if (isError) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <h3 className="text-2xl font-semibold md:text-4xl">Oops! Something went wrong.</h3>
      </div>
    )
  }

  if (isLoading)
    return (
      <div className="flex flex-1 items-center justify-center">
        <Spinner size="lg" color="primary" />
      </div>
    )

  return (
    <>
      <div className="grid w-full max-w-[95rem] grid-cols-[1fr_auto] gap-3 self-center px-3 py-5 md:grid-cols-[1fr_800px_1fr] md:gap-10 md:px-0 md:py-10">
        {/** TITLE */}
        <h3 className="col-span-2 col-start-1 text-2xl font-bold md:col-span-1 md:col-start-2 md:text-5xl">
          {gif.data.title}
        </h3>

        {/** USER */}
        <UserSection className="row-start-3 md:row-start-2" {...gif.data.user} />

        {/** GIF */}
        <Image
          removeWrapper
          alt="Default Gif"
          className="col-span-2 row-start-2 w-full md:col-span-1"
          src={gif.data.images.downsized_medium.url}
          isLoading={isLoading}
        />

        {/** BUTTONS */}
        <ButtonsSection
          className="row-start-3 md:row-start-2"
          isInFavorites={favoritesIDs.includes(gif_id)}
          {...gif.data}
        />
      </div>

      {/** Related GIFs */}
      <GifsPage tittle="Related GIFs" subTittle={gif.data.title} {...data} />
    </>
  )
}
