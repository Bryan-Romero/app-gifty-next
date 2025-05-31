import { DataGifs } from "@/types";
import { addToast, Button } from "@heroui/react";
import { useCallback, useState } from "react";

export function useGifActions(gif?: DataGifs) {
  const [downloading, setDownloading] = useState(false);

  // Descargar GIF
  const handleDownload = useCallback(async () => {
    if (!gif) {
      addToast({
        color: "danger",
        title: "No GIF found",
        description: "Please try again later.",
        timeout: 3000,
      });
      return;
    }

    setDownloading(true);
    const url = gif.images.original.url;
    const fileName = gif.title || "download.gif";
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      addToast({
        color: "danger",
        title: "Something went wrong",
        description: "Please try again later.",
        timeout: 3000,
      });
    }
    setDownloading(false);
  }, [gif]);

  // Copiar enlace
  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      addToast({
        color: "success",
        title: "Link copied",
        description: "The link has been copied to the clipboard.",
        timeout: 3000,
      });
    });
  }, []);

  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    window.location.href
  )}`;
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    window.location.href
  )}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    window.location.href
  )}`;
  const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
    window.location.href
  )}`;

  return {
    handleDownload,
    handleCopyLink,
    facebookUrl,
    twitterUrl,
    whatsappUrl,
    linkedinUrl,
    downloading,
  };
}
