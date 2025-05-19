import { Gifs as GifsInterface } from "@/types";
import { Spinner } from "@heroui/react";
import { InfiniteData } from "@tanstack/react-query";
import { Gif } from "./Gif";

// Props de GifsPage

/**
 * @param data
 *   Objeto de datos paginados (infinite scroll) que contiene los GIFs a mostrar.
 *   Tipo: InfiniteData<GifsInterface, unknown>
 *
 * @param isLoading
 *   Indica si los datos iniciales están cargando.
 *   Tipo: boolean
 *
 * @param hasNextPage
 *   Indica si hay más páginas de GIFs disponibles para cargar.
 *   Tipo: boolean
 *
 * @param isFetchingNextPage
 *   Indica si se está cargando la siguiente página de GIFs.
 *   Tipo: boolean
 *
 * @param scrollTriggerRef
 *   Referencia de React para el elemento que dispara la carga de más GIFs al hacer scroll.
 *   Tipo: (node?: Element | null) => void
 *
 * @param search
 *   (Opcional) Término de búsqueda actual para filtrar los GIFs.
 *   Tipo: string
 */

interface GifsProps {
  data: InfiniteData<GifsInterface, unknown>;
  isLoading: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  scrollTriggerRef: (node?: Element | null) => void;
  search?: string;
}

export const GifsPage = ({
  data,
  hasNextPage,
  isFetchingNextPage,
  scrollTriggerRef,
  search,
}: GifsProps) => {
  if (!data?.pages) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Spinner
          size="lg"
          color="primary"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col self-center w-full max-w-[95rem] p-4 gap-4">
      <h3 className="text-2xl md:text-4xl font-semibold">
        {search
          ? search.charAt(0).toUpperCase() + search.slice(1)
          : "Trending Now"}
      </h3>

      <div
        className="
          w-full items-center grid gap-3
          grid-cols-gifs auto-rows-gifs
          md:grid-cols-gifsMd md:auto-rows-gifsMd 
          grid-flow-row-dense"
      >
        {data.pages.map((page) =>
          page.data.map((gif) => (
            <Gif
              key={gif.id}
              {...gif}
            />
          ))
        )}
      </div>

      {hasNextPage ? (
        <div
          ref={scrollTriggerRef}
          className="pt-10 pb-40"
        >
          {isFetchingNextPage && (
            <Spinner
              size="lg"
              color="primary"
            />
          )}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-10 text-xl">
          No more GIFs
        </div>
      )}
    </div>
  );
};
