'use client'

import { Button, useDisclosure } from '@heroui/react'
import { twMerge } from 'tailwind-merge'

import { ModalSignin } from '@/components/Modals/ModalSignin'
import { useGifActions } from '@/hooks'
import { DataGif } from '@/types'
import { DownloadIcon, LikeIcon, LinkIcon, NotLikeIcon, PaperPlaneIcom } from '../../Icons'
import { ModalShare } from './ModalShare'

interface ButtonsSectionProps extends DataGif {
  className?: string
  isInFavorites: boolean
}

export const ButtonsSection = ({ className, isInFavorites, ...gif }: ButtonsSectionProps) => {
  const shareModalControl = useDisclosure()
  const signInModalControl = useDisclosure()
  const { handleDownload, handleCopyLink, downloading, handleAddToFavorites, handleRemoveFromFavorites } =
    useGifActions(gif, signInModalControl)

  return (
    <>
      <div
        className={twMerge(
          'flex w-full flex-row items-center justify-end gap-3 md:flex-col md:items-start md:justify-start',
          className
        )}
      >
        {/* DESKTOP SECTIO */}
        {isInFavorites ? (
          <Button
            className="hidden text-lg md:flex"
            color="danger"
            startContent={<LikeIcon />}
            variant="flat"
            onClick={handleRemoveFromFavorites}
          >
            Remove favorite
          </Button>
        ) : (
          <Button
            className="hidden text-lg md:flex"
            color="danger"
            startContent={<NotLikeIcon />}
            variant="flat"
            onClick={handleAddToFavorites}
          >
            Favorite
          </Button>
        )}

        <Button
          className="hidden text-lg md:flex"
          color="success"
          startContent={<LinkIcon />}
          variant="flat"
          onPress={handleCopyLink}
        >
          Copy Link
        </Button>
        <Button
          className="hidden text-lg md:flex"
          color="primary"
          variant="flat"
          {...(!downloading && { startContent: <DownloadIcon /> })}
          disabled={downloading}
          isLoading={downloading}
          onPress={handleDownload}
        >
          Download
        </Button>

        {/* MOBILE SECTION */}
        <Button isIconOnly className="flex md:hidden" color="danger" variant="flat">
          <NotLikeIcon size="xl" />
        </Button>
        <Button isIconOnly className="flex md:hidden" color="success" variant="flat" onPress={shareModalControl.onOpen}>
          <PaperPlaneIcom size="xl" />
        </Button>
        <Button
          isIconOnly
          className="flex md:hidden"
          color="primary"
          disabled={downloading}
          isLoading={downloading}
          variant="flat"
          onPress={handleDownload}
        >
          {!downloading && <DownloadIcon size="xl" />}
        </Button>
      </div>
      <ModalShare isOpen={shareModalControl.isOpen} onOpenChange={shareModalControl.onOpenChange} />
      <ModalSignin {...signInModalControl} />
    </>
  )
}
