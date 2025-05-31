"use client";

import { useGifActions } from "@/hooks";
import {
  Button,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from "@heroui/react";
import {
  FacebookIcon,
  LinkedinIcon,
  LinkIcon,
  WhatsappIcon,
  XTwitterIcon,
} from "../../Icons";

export const ModalShare = ({
  isOpen,
  onOpenChange,
}: Omit<ModalProps, "children">) => {
  const { handleCopyLink, facebookUrl, twitterUrl, whatsappUrl, linkedinUrl } =
    useGifActions();

  return (
    <Modal
      backdrop="opaque"
      placement="bottom-center"
      size="sm"
      isOpen={isOpen}
      motionProps={{
        variants: {
          enter: {
            y: -20,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            y: 0,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        },
      }}
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
                variant="flat"
                startContent={<LinkIcon size="xl" />}
                onPress={() => {
                  handleCopyLink();
                  onClose();
                }}
              >
                Copy Link
              </Button>

              <Button
                as={Link}
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-1 bg-[#1877F3] hover:bg-[#166fe0] text-white"
                startContent={<FacebookIcon size="xl" />}
                onPress={onClose}
              >
                Facebook
              </Button>

              <Button
                as={Link}
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-1 bg-[#25D366] hover:bg-[#1ebe57] text-white"
                startContent={<WhatsappIcon size="xl" />}
                onPress={onClose}
              >
                WhatsApp
              </Button>

              <Button
                as={Link}
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-1 bg-black hover:bg-neutral-800 text-white"
                startContent={<XTwitterIcon size="xl" />}
                onPress={onClose}
              />

              <Button
                as={Link}
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-1 bg-[#0077B5] hover:bg-[#006097] text-white"
                startContent={<LinkedinIcon size="xl" />}
                onPress={onClose}
              >
                LinkedIn
              </Button>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={onClose}
              >
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
