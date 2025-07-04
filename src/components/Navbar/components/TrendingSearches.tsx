'use client'

import { Button, Link, ScrollShadow } from '@heroui/react'

import { ArrowTrendUpIcon, ChevronLeftIcon, ChevronRightIcon } from '@/components/Icons'
import { useScrollButtons, useTrendingSearches } from '@/hooks'

export const TrendingSearches = () => {
  const { data: trendingSearches, isLoading, isError } = useTrendingSearches()
  const { atEnd, atStart, scrollLeft, scrollRef, scrollRight } = useScrollButtons([trendingSearches])

  if (!isLoading && !isError) {
    return (
      <div className="mt-4 flex justify-center md:mt-6">
        <div className="group relative w-full max-w-[95rem] px-4">
          {/* Botón izquierda */}
          {!atStart && (
            <Button
              onPress={scrollLeft}
              isIconOnly
              radius="full"
              className="absolute top-1/2 left-0 z-10 -translate-y-1/2 bg-transparent opacity-0 transition-opacity group-hover:opacity-100"
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
            className="grid w-full auto-cols-max grid-flow-col gap-3 overflow-x-auto"
            ref={scrollRef}
          >
            {trendingSearches.data.map((trending, index) => (
              <Button
                as={Link}
                color="secondary"
                variant="flat"
                href={`/search/${encodeURIComponent(trending)}`}
                className="text-lg font-light"
                startContent={<ArrowTrendUpIcon className="h-5 w-5" />}
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
              className="absolute top-1/2 right-0 z-10 -translate-y-1/2 bg-transparent opacity-0 transition-opacity group-hover:opacity-100"
              aria-label="Scroll right"
              tabIndex={-1}
            >
              <ChevronRightIcon size="2x" />
            </Button>
          )}
        </div>
      </div>
    )
  } else {
    return null
  }
}
