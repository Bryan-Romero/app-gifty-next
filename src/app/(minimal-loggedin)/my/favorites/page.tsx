'use client'

import { GifsPage } from '@/components/Gif/GifsPage'
import { useGifsFavorites } from '@/hooks'

export default function Page() {
  const data = useGifsFavorites()

  return <GifsPage firstGifPriority title="My Favorites" {...data} />
}
