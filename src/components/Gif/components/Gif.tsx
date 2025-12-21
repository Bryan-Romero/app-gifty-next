'use client'

import { memo, MouseEvent, useMemo } from 'react'
import Link from 'next/link'
import { Button, Image as ImgGif, useDisclosure } from '@heroui/react'

import { ExpandIcon, LikeIcon, NotLikeIcon } from '@/components/Icons'
import { ModalSignin } from '@/components/Modals/ModalSignin'
import { useGifActions } from '@/hooks'
import { DataGif } from '@/types'
import { ModalGif } from './ModalGif'

interface GifProps extends DataGif {
  isInFavorites: boolean
}

interface ResponsiveGifSources {
  mobile: string
  tablet: string
  laptop: string
  desktop: string
}

export const Gif = memo(
  function Gif({ isInFavorites, ...gif }: GifProps) {
    const { images, id, title, alt_text } = gif
    const gifModalControl = useDisclosure()
    const signInModalControl = useDisclosure()
    const { handleAddToFavorites, handleRemoveFromFavorites } = useGifActions(gif, signInModalControl)

    // Configure responsive sources based on screen size
    const responsiveGif: ResponsiveGifSources = useMemo(
      () => ({
        mobile: images.fixed_width_downsampled.webp || images.fixed_width_downsampled.url,
        tablet: images.fixed_width_small.webp || images.fixed_width_small.url,
        laptop: images.fixed_width.webp || images.fixed_width.url,
        desktop: images.fixed_width.webp || images.fixed_width.url,
      }),
      [images]
    )

    // Generate srcSet for responsive images
    const srcSet = useMemo(
      () =>
        `${responsiveGif.mobile} 640w, ${responsiveGif.tablet} 768w, ${responsiveGif.laptop} 1024w, ${responsiveGif.desktop} 1536w`,
      [responsiveGif]
    )

    // Define sizes based on breakpoints
    const sizes = '(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'

    const handleExpand = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      e.preventDefault()
      e.stopPropagation()
      gifModalControl.onOpen()
    }

    return (
      <>
        <Link
          className="group/item relative col-span-1 row-span-1 h-full overflow-hidden rounded-md border-none hover:scale-101 hover:ring-[6px] md:[&:nth-child(10n_+_3)]:col-span-2 md:[&:nth-child(10n_+_3)]:row-span-1 md:[&:nth-child(11n_+_1)]:col-span-2 md:[&:nth-child(11n_+_1)]:row-span-2 [&:nth-child(5n_+_1)]:hover:ring-rose-500 [&:nth-child(5n_+_2)]:hover:ring-blue-500 [&:nth-child(5n_+_3)]:hover:ring-green-500 [&:nth-child(5n_+_4)]:hover:ring-yellow-500 [&:nth-child(5n_+_5)]:hover:ring-purple-500 md:[&:nth-child(8n_+_1)]:col-span-2 md:[&:nth-child(8n_+_1)]:row-span-2"
          href={`/gif/${id}`}
        >
          <ImgGif
            removeWrapper
            alt={alt_text || title}
            className="h-full w-full object-cover"
            loading="lazy"
            radius="none"
            sizes={sizes}
            src={responsiveGif.tablet}
            srcSet={srcSet}
          />
          <div className="absolute bottom-0 left-0 z-10 hidden w-full flex-row justify-start overflow-auto bg-black/40 p-1 group-hover/item:flex">
            <h3 className="text-xs font-medium">{title}</h3>
          </div>

          <div className="absolute top-0 right-0 z-10 flex h-full flex-col justify-start gap-2 overflow-hidden p-1">
            {isInFavorites ? (
              <Button disableAnimation isIconOnly className="bg-black/15" onClick={handleRemoveFromFavorites}>
                <LikeIcon color="#F05161" size="2x" />
              </Button>
            ) : (
              <Button disableAnimation isIconOnly className="bg-black/15" onClick={handleAddToFavorites}>
                <NotLikeIcon size="2x" />
              </Button>
            )}
            <Button disableAnimation isIconOnly className="bg-black/15" onClick={handleExpand}>
              <ExpandIcon size="2x" />
            </Button>
          </div>
        </Link>

        <ModalGif {...gif} {...gifModalControl} />
        <ModalSignin {...signInModalControl} />
      </>
    )
  },
  (prevProps, nextProps) => {
    return prevProps.id === nextProps.id && prevProps.isInFavorites === nextProps.isInFavorites
  }
)
