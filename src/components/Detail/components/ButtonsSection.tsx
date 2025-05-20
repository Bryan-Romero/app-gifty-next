import { useGifActions } from "@/hooks";
import { DataGifs } from "@/types";
import { Button, useDisclosure } from "@heroui/react";
import { twMerge } from "tailwind-merge";
import {
  DownloadIcon,
  LinkIcon,
  NotLikeIcon,
  PaperPlaneIcom,
} from "../../Icons";
import { ModalShare } from "./ModalShare";

interface ButtonsSectionProps {
  className?: string;
  gif: DataGifs;
}

export const ButtonsSection = ({ className, gif }: ButtonsSectionProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { handleDownload, handleCopyLink, downloading } = useGifActions(gif);

  return (
    <>
      <div
        className={twMerge(
          "w-full flex flex-row md:flex-col justify-end md:justify-start items-center md:items-start gap-3",
          className
        )}
      >
        {/* DESKTOP SECTIO */}
        <Button
          className="hidden md:flex text-lg"
          color="danger"
          variant="flat"
          startContent={<NotLikeIcon />}
        >
          Favorite
        </Button>
        <Button
          className="hidden md:flex text-lg"
          color="success"
          variant="flat"
          startContent={<LinkIcon />}
          onPress={handleCopyLink}
        >
          Copy Link
        </Button>
        <Button
          className="hidden md:flex text-lg"
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
        <Button
          className="flex md:hidden"
          isIconOnly
          color="danger"
          variant="flat"
        >
          <NotLikeIcon size="xl" />
        </Button>
        <Button
          className="flex md:hidden"
          isIconOnly
          color="success"
          variant="flat"
          onPress={onOpen}
        >
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
      <ModalShare
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </>
  );
};
