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

export function ModalGif({ title, id, images, alt_text, isOpen, onOpenChange }: ModalGifProps) {
  const [loading, setLoading] = useState(true)

  return (
    <Modal
      backdrop="opaque"
      classNames={{
        backdrop: 'bg-black/80',
        base: 'max-h-5/6',
        body: 'overflow-y-auto',
      }}
      isOpen={isOpen}
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
      placement="center"
      shadow="lg"
      size="3xl"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>
              {loading && <Spinner className="absolute inset-0 m-auto" color="primary" size="lg" />}
              <Image
                removeWrapper
                alt={alt_text || title}
                className="mx-auto h-full w-full"
                classNames={{ img: 'object-contain' }}
                src={images.downsized_medium.url}
                onError={() => setLoading(false)}
                onLoad={() => setLoading(false)}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button as={Link} color="primary" href={`/gif/${id}`}>
                Detail
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
