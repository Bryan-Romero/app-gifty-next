"use client";

import { GifsPage } from "@/components/Gif/GifsPage";
import { useGifsSearch } from "@/hooks";

export default function Page({ params }: { params: { search: string } }) {
  const search = decodeURIComponent(params.search);
  const data = useGifsSearch(search);

  return (
    <GifsPage
      tittle={search}
      {...data}
    />
  );
}
