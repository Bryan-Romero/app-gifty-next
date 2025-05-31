"use client";

import {
  ArrowTrendUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/components/Icons";
import { useScrollButtons, useTrendingSearches } from "@/hooks";
import { Button, Link, ScrollShadow } from "@heroui/react";

export const TrendingSearches = () => {
  const { data: trendingSearches, isLoading, isError } = useTrendingSearches();
  const { atEnd, atStart, scrollLeft, scrollRef, scrollRight } =
    useScrollButtons([trendingSearches]);

  if (!isLoading && !isError) {
    return (
      <div className="flex justify-center mt-4 md:mt-6">
        <div className="relative group w-full max-w-[95rem] px-4">
          {/* Botón izquierda */}
          {!atStart && (
            <Button
              onPress={scrollLeft}
              isIconOnly
              radius="full"
              className="
                absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-transparent
                opacity-0 group-hover:opacity-100 transition-opacity
              "
              aria-label="Scroll left"
              tabIndex={-1}
            >
              <ChevronLeftIcon size="2x" />
            </Button>
          )}

          {/* ScrollShadow con ref */}
          <ScrollShadow
            orientation="horizontal"
            hideScrollBar
            className="w-full grid grid-flow-col auto-cols-max gap-3 overflow-x-auto"
            ref={scrollRef}
          >
            {trendingSearches.data.map((trending, index) => (
              <Button
                as={Link}
                color="secondary"
                variant="flat"
                href={`/search/${encodeURIComponent(trending)}`}
                className="text-lg font-light"
                startContent={<ArrowTrendUpIcon className="w-5 h-5" />}
                key={`${trending}-${index}`}
                size="sm"
              >
                {trending.charAt(0).toUpperCase() + trending.slice(1)}
              </Button>
            ))}
          </ScrollShadow>

          {/* Botón derecha */}
          {!atEnd && (
            <Button
              onPress={scrollRight}
              isIconOnly
              radius="full"
              className="
                absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-transparent
                opacity-0 group-hover:opacity-100 transition-opacity
              "
              aria-label="Scroll right"
              tabIndex={-1}
            >
              <ChevronRightIcon size="2x" />
            </Button>
          )}
        </div>
      </div>
    );
  } else {
    return null;
  }
};
