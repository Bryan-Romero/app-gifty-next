import { DependencyList, useEffect, useRef, useState } from 'react'

export function useScrollButtons(deps?: DependencyList) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  const [scrollAmount, setScrollAmount] = useState(500)

  const checkScroll = () => {
    const el = scrollRef.current
    if (!el) return
    setAtStart(el.scrollLeft <= 0)
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1)
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    checkScroll()
    el.addEventListener('scroll', checkScroll)
    window.addEventListener('resize', checkScroll)

    setScrollAmount(el.scrollWidth / 7) // Ajusta la cantidad de desplazamiento según el ancho del contenedor

    return () => {
      el.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [deps])

  const scrollLeft = () => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
  }

  const scrollRight = () => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  return {
    scrollRef,
    atStart,
    atEnd,
    scrollLeft,
    scrollRight,
  }
}
