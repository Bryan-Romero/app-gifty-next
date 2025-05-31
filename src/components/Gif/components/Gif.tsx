"use client";

import { ExpandIcon, LikeIcon, NotLikeIcon } from "@/components/Icons";
import { DataGifs } from "@/types";
import { Button, Image as ImgGif, useDisclosure } from "@heroui/react";
import Link from "next/link";
import { memo, MouseEvent } from "react";
import { ModalGif } from "./ModalGif";

export const Gif = memo(
  function Gif(gif: DataGifs) {
    const { images, id, title } = gif;
    const modalGifControl = useDisclosure();

    const handleAddToFavorites = (
      e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
    ) => {
      e.preventDefault(); // Evita que se siga el enlace
      e.stopPropagation(); // Evita que el clic se propague al Link
      // Tu lógica...
    };

    const handleRemoveFromFavorites = (
      e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
    ) => {
      e.preventDefault(); // Evita que se siga el enlace
      e.stopPropagation(); // Evita que el clic se propague al Link
      // Tu lógica...
    };

    const handleExpand = (
      e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
    ) => {
      e.preventDefault(); // Evita que se siga el enlace
      e.stopPropagation(); // Evita que el clic se propague al Link
      // Tu lógica...
      modalGifControl.onOpen();
    };

    return (
      <>
        <Link
          href={`/gif/${id}`}
          className="
          h-full border-none rounded-md overflow-hidden group/item relative 

          col-span-1 row-span-1 
          md:[&:nth-child(11n_+_1)]:col-span-2 md:[&:nth-child(11n_+_1)]:row-span-2  
          md:[&:nth-child(8n_+_1)]:col-span-2 md:[&:nth-child(8n_+_1)]:row-span-2 
          md:[&:nth-child(10n_+_3)]:col-span-2 md:[&:nth-child(10n_+_3)]:row-span-1 
          
          hover:scale-101
          hover:ring-[6px]
          [&:nth-child(5n_+_1)]:hover:ring-rose-500
          [&:nth-child(5n_+_2)]:hover:ring-blue-500
          [&:nth-child(5n_+_3)]:hover:ring-green-500
          [&:nth-child(5n_+_4)]:hover:ring-yellow-500
          [&:nth-child(5n_+_5)]:hover:ring-purple-500"
        >
          <ImgGif
            removeWrapper
            alt="Default Gif"
            className="object-cover w-full h-full"
            radius="none"
            loading="lazy"
            src={images.fixed_width.url}
          />
          <div className="overflow-auto absolute left-0 bottom-0 z-10 w-full hidden group-hover/item:flex flex-row justify-start p-1 bg-black/40">
            <h3 className="text-xs font-medium">{title}</h3>
          </div>

          <div className="overflow-hidden absolute right-0 top-0 z-10 h-full flex flex-col justify-start gap-2 p-1">
            {false ? (
              <Button
                isIconOnly
                onClick={handleRemoveFromFavorites} //Usar onClick solo en los botones dentro de <Link></Link>
                className="bg-black/15"
                disableAnimation
              >
                <LikeIcon
                  color="#F05161"
                  size="2x"
                />
              </Button>
            ) : (
              <Button
                isIconOnly
                onClick={handleAddToFavorites} //Usar onClick solo en los botones dentro de <Link></Link>
                className="bg-black/15"
                disableAnimation
              >
                <NotLikeIcon size="2x" />
              </Button>
            )}
            <Button
              isIconOnly
              onClick={handleExpand} //Usar onClick solo en los botones dentro de <Link></Link>
              className="bg-black/15"
              disableAnimation
            >
              <ExpandIcon size="2x" />
            </Button>
          </div>
        </Link>

        <ModalGif
          {...gif}
          {...modalGifControl}
        />
      </>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.id === nextProps.id;
  }
);
