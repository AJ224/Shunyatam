"use client"

import { useEffect, useRef, type ReactNode } from "react"

interface ScrollObserverProps {
  children: ReactNode
  className?: string
  threshold?: number
  rootMargin?: string
  onIntersect?: () => void
}

export default function ScrollObserver({
  children,
  className = "",
  threshold = 0.1,
  rootMargin = "0px",
  onIntersect,
}: ScrollObserverProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
            if (onIntersect) onIntersect()
          }
        })
      },
      {
        threshold,
        rootMargin,
      },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold, rootMargin, onIntersect])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
