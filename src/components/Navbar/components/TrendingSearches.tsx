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
              isIconOnly
              aria-label="Scroll left"
              className="absolute top-1/2 left-0 z-10 -translate-y-1/2 bg-transparent opacity-0 transition-opacity group-hover:opacity-100"
              radius="full"
              tabIndex={-1}
              onPress={scrollLeft}
            >
              <ChevronLeftIcon size="2x" />
            </Button>
          )}

          {/* ScrollShadow con ref */}
          <ScrollShadow
            ref={scrollRef}
            hideScrollBar
            className="grid w-full auto-cols-max grid-flow-col gap-3 overflow-x-auto"
            orientation="horizontal"
          >
            {trendingSearches.data.map((trending, index) => (
              <Button
                key={`${trending}-${index}`}
                as={Link}
                className="text-lg font-light"
                color="secondary"
                href={`/search/${encodeURIComponent(trending)}`}
                size="sm"
                startContent={<ArrowTrendUpIcon className="h-5 w-5" />}
                variant="flat"
              >
                {trending.charAt(0).toUpperCase() + trending.slice(1)}
              </Button>
            ))}
          </ScrollShadow>

          {/* Botón derecha */}
          {!atEnd && (
            <Button
              isIconOnly
              aria-label="Scroll right"
              className="absolute top-1/2 right-0 z-10 -translate-y-1/2 bg-transparent opacity-0 transition-opacity group-hover:opacity-100"
              radius="full"
              tabIndex={-1}
              onPress={scrollRight}
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
