'use client'

import { Button, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalProps } from '@heroui/react'

import { useGifActions } from '@/hooks'
import { FacebookIcon, LinkedinIcon, LinkIcon, WhatsappIcon, XTwitterIcon } from '../../Icons'

export const ModalShare = ({ isOpen, onOpenChange }: Omit<ModalProps, 'children'>) => {
  const { handleCopyLink, facebookUrl, twitterUrl, whatsappUrl, linkedinUrl } = useGifActions()

  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      motionProps={{
        variants: {
          enter: {
            y: -20,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: 'easeOut',
            },
          },
          exit: {
            y: 0,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: 'easeIn',
            },
          },
        },
      }}
      placement="bottom-center"
      size="sm"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Share</ModalHeader>
            <ModalBody className="grid grid-cols-2 gap-4">
              <Button
                className="col-span-2"
                color="default"
                startContent={<LinkIcon size="xl" />}
                variant="flat"
                onPress={() => {
                  handleCopyLink()
                  onClose()
                }}
              >
                Copy Link
              </Button>

              <Button
                as={Link}
                className="col-span-1 bg-[#1877F3] text-white hover:bg-[#166fe0]"
                href={facebookUrl}
                rel="noopener noreferrer"
                startContent={<FacebookIcon size="xl" />}
                target="_blank"
                onPress={onClose}
              >
                Facebook
              </Button>

              <Button
                as={Link}
                className="col-span-1 bg-[#25D366] text-white hover:bg-[#1ebe57]"
                href={whatsappUrl}
                rel="noopener noreferrer"
                startContent={<WhatsappIcon size="xl" />}
                target="_blank"
                onPress={onClose}
              >
                WhatsApp
              </Button>

              <Button
                as={Link}
                className="col-span-1 bg-black text-white hover:bg-neutral-800"
                href={twitterUrl}
                rel="noopener noreferrer"
                startContent={<XTwitterIcon size="xl" />}
                target="_blank"
                onPress={onClose}
              />

              <Button
                as={Link}
                className="col-span-1 bg-[#0077B5] text-white hover:bg-[#006097]"
                href={linkedinUrl}
                rel="noopener noreferrer"
                startContent={<LinkedinIcon size="xl" />}
                target="_blank"
                onPress={onClose}
              >
                LinkedIn
              </Button>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
