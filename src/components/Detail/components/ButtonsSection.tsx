'use client'

import { Button, useDisclosure } from '@heroui/react'
import { twMerge } from 'tailwind-merge'

import { ModalSignIn } from '@/components/Modals/ModalSignIn'
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
            variant="flat"
            startContent={<LikeIcon />}
            onClick={handleRemoveFromFavorites}
          >
            Remove favorite
          </Button>
        ) : (
          <Button
            className="hidden text-lg md:flex"
            color="danger"
            variant="flat"
            startContent={<NotLikeIcon />}
            onClick={handleAddToFavorites}
          >
            Favorite
          </Button>
        )}

        <Button
          className="hidden text-lg md:flex"
          color="success"
          variant="flat"
          startContent={<LinkIcon />}
          onPress={handleCopyLink}
        >
          Copy Link
        </Button>
        <Button
          className="hidden text-lg md:flex"
          color="primary"
          variant="flat"
          {...(!downloading && { startContent: <DownloadIcon /> })}
          onPress={handleDownload}
          disabled={downloading}
          isLoading={downloading}
        >
          Download
        </Button>

        {/* MOBILE SECTION */}
        <Button className="flex md:hidden" isIconOnly color="danger" variant="flat">
          <NotLikeIcon size="xl" />
        </Button>
        <Button className="flex md:hidden" isIconOnly color="success" variant="flat" onPress={shareModalControl.onOpen}>
          <PaperPlaneIcom size="xl" />
        </Button>
        <Button
          className="flex md:hidden"
          isIconOnly
          color="primary"
          variant="flat"
          onPress={handleDownload}
          disabled={downloading}
          isLoading={downloading}
        >
          {!downloading && <DownloadIcon size="xl" />}
        </Button>
      </div>
      <ModalShare isOpen={shareModalControl.isOpen} onOpenChange={shareModalControl.onOpenChange} />
      <ModalSignIn {...signInModalControl} />
    </>
  )
}
