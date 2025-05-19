import { DataGifs } from "@/types";
import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
  Spinner,
} from "@heroui/react";
import NextLink from "next/link";
import { useState } from "react";

type ModalGifProps = Omit<ModalProps, "children"> & DataGifs;

export function ModalGif({
  title,
  id,
  images,
  isOpen,
  onOpenChange,
}: ModalGifProps) {
  const [loading, setLoading] = useState(true);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="3xl"
      placement="center"
      backdrop="opaque"
      shadow="lg"
      classNames={{
        backdrop: "bg-black/80",
      }}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
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
              {loading && (
                <Spinner
                  size="lg"
                  color="primary"
                  className="absolute inset-0 m-auto"
                />
              )}
              <Image
                removeWrapper
                alt="Default Gif"
                className="w-full"
                src={images.downsized_medium.url}
                onLoad={() => setLoading(false)}
                onError={() => setLoading(false)}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={onClose}
              >
                Close
              </Button>
              <Button
                color="primary"
                as={NextLink}
                href={`/detail/${id}`}
                target="_blank"
              >
                Detail
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
