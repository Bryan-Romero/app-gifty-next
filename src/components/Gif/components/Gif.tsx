'use client'

import { memo, MouseEvent } from 'react'
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

export const Gif = memo(
  function Gif({ isInFavorites, ...gif }: GifProps) {
    const { images, id, title, alt_text } = gif
    const gifModalControl = useDisclosure()
    const signInModalControl = useDisclosure()
    const { handleAddToFavorites, handleRemoveFromFavorites } = useGifActions(gif, signInModalControl)

    const handleExpand = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      e.preventDefault() // Evita que se siga el enlace
      e.stopPropagation() // Evita que el clic se propague al Link
      // Tu lógica...
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
            src={images.fixed_width.url}
          />
          <div className="absolute bottom-0 left-0 z-10 hidden w-full flex-row justify-start overflow-auto bg-black/40 p-1 group-hover/item:flex">
            <h3 className="text-xs font-medium">{title}</h3>
          </div>

          <div className="absolute top-0 right-0 z-10 flex h-full flex-col justify-start gap-2 overflow-hidden p-1">
            {isInFavorites ? (
              <Button
                disableAnimation
                isIconOnly
                className="bg-black/15"
                onClick={handleRemoveFromFavorites} //Usar onClick solo en los botones dentro de <Link></Link>
              >
                <LikeIcon color="#F05161" size="2x" />
              </Button>
            ) : (
              <Button
                disableAnimation
                isIconOnly
                className="bg-black/15"
                onClick={handleAddToFavorites} //Usar onClick solo en los botones dentro de <Link></Link>
              >
                <NotLikeIcon size="2x" />
              </Button>
            )}
            <Button
              disableAnimation
              isIconOnly
              className="bg-black/15"
              onClick={handleExpand} //Usar onClick solo en los botones dentro de <Link></Link>
            >
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
