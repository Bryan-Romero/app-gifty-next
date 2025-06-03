"use client";

import { GifsPage } from "@/components/Gif/GifsPage";
import { useGifsFavorites } from "@/hooks";

export default function Page() {
  const data = useGifsFavorites();

  return (
    <GifsPage
      tittle="My Favorites"
      {...data}
    />
  );
}
