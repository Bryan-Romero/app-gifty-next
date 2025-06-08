"use client";
import { use } from "react";

import { GifsPage } from "@/components/Gif/GifsPage";
import { useGifsSearch } from "@/hooks";

export default function Page(props: { params: Promise<{ search: string }> }) {
  const params = use(props.params);
  const search = decodeURIComponent(params.search);
  const data = useGifsSearch(search);

  return (
    <GifsPage
      tittle={search}
      {...data}
    />
  );
}
