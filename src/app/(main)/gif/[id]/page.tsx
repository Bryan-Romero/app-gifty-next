import type { Metadata } from 'next'

import DetailPage from '@/components/Detail/DetailPage'
import { getGifByID } from '@/services'

export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const params = await props.params
  const { data: gif } = await getGifByID(params.id)

  if (!gif) {
    return { title: 'GIF not found' }
  }

  return {
    title: gif.title || 'GIF Detail',
    description: gif.title || 'GIF from Gifty',
    openGraph: {
      title: gif.title || 'GIF Detail',
      description: gif.title || 'GIF from Gifty',
      images: [
        {
          url: gif.images.original.url,
          width: 480,
          height: 270,
          alt: gif.title || 'GIF',
        },
      ],
      url: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/gif/${params.id}`,
      type: 'video.other',
    },
    twitter: {
      card: 'summary_large_image',
      title: gif.title || 'GIF Detail',
      description: gif.title || 'GIF from Gifty',
      images: [gif.images.original.url],
    },
  }
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params

  return <DetailPage gif_id={params.id} />
}
