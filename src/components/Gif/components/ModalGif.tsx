'use client'

import { useState } from 'react'
import {
  Button,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
  Spinner,
} from '@heroui/react'

import { DataGif } from '@/types'

type ModalGifProps = Omit<ModalProps, 'children'> & DataGif

export function ModalGif({ title, id, images, isOpen, onOpenChange }: ModalGifProps) {
  const [loading, setLoading] = useState(true)

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="3xl"
      placement="center"
      backdrop="opaque"
      shadow="lg"
      classNames={{
        backdrop: 'bg-black/80',
        base: 'max-h-5/6',
        body: 'overflow-y-auto',
      }}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: 'easeOut',
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: 'easeIn',
            },
          },
        },
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>
              {loading && <Spinner size="lg" color="primary" className="absolute inset-0 m-auto" />}
              <Image
                removeWrapper
                alt="Default Gif"
                className="mx-auto h-full w-full"
                classNames={{ img: 'object-contain' }}
                src={images.downsized_medium.url}
                onLoad={() => setLoading(false)}
                onError={() => setLoading(false)}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" as={Link} href={`/gif/${id}`}>
                Detail
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
