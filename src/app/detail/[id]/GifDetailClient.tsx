"use client";

import { ButtonsSection, UserSection } from "@/components/Detail";
import { Image, Spinner } from "@heroui/react";
import { useGifByID } from "@/hooks";

interface Props {
  gif_id: string;
}

export default function GifDetailClient({ gif_id }: Props) {
  const { data: gif, isLoading, isError } = useGifByID(gif_id);

  if (isError) {
    return (
      <div className="flex flex-1 justify-center items-center">
        <h3 className="text-2xl md:text-4xl font-semibold">
          Oops! Something went wrong.
        </h3>
      </div>
    );
  }

  if (isLoading)
    return (
      <div className="flex flex-1 justify-center items-center">
        <Spinner
          size="lg"
          color="primary"
        />
      </div>
    );

  return (
    <div
      className="self-center w-full max-w-[95rem] h-auto
        px-3 md:px-0 py-5 md:py-10
        grid gap-3 md:gap-10 
        grid-cols-[1fr_auto] md:grid-cols-[1fr_800px_1fr]"
    >
      {/* TITLE */}
      <h3
        className="
            text-2xl md:text-5xl font-bold 
            col-start-1 md:col-start-2  
            col-span-2 md:col-span-1"
      >
        {gif.data.title}
      </h3>

      {/* USER */}
      <UserSection
        className="row-start-3 md:row-start-2"
        {...gif.data.user}
      />

      {/* GIF */}
      <Image
        removeWrapper
        alt="Default Gif"
        className="w-full
                row-start-2
                col-span-2 md:col-span-1"
        src={gif.data.images.downsized_medium.url}
        isLoading={isLoading}
      />

      {/* BUTTONS */}
      <ButtonsSection
        className="row-start-3 md:row-start-2"
        gif={gif.data}
      />
    </div>
  );
}
