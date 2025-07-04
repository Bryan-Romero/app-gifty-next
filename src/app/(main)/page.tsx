'use client'

import { GifsPage } from '@/components/Gif/GifsPage'
import { useGifsTrending } from '@/hooks'

export default function Page() {
  const data = useGifsTrending()

  return <GifsPage tittle="Trending Now" {...data} />
}
