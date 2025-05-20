import GifDetailPage from "@/components/Detail/GifDetailPage";
import { getGifByID } from "@/services";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { data: gif } = await getGifByID(params.id);

  if (!gif) {
    return { title: "GIF not found" };
  }

  return {
    title: gif.title || "GIF Detail",
    description: gif.title || "GIF from Gifty",
    openGraph: {
      title: gif.title || "GIF Detail",
      description: gif.title || "GIF from Gifty",
      images: [
        {
          url: gif.images.original.url,
          width: 480,
          height: 270,
          alt: gif.title || "GIF",
        },
      ],
      url: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/detail/${params.id}`,
      type: "video.other",
    },
    twitter: {
      card: "summary_large_image",
      title: gif.title || "GIF Detail",
      description: gif.title || "GIF from Gifty",
      images: [gif.images.original.url],
    },
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  return <GifDetailPage gif_id={params.id} />;
}
