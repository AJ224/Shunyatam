"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import ScrollObserver from "@/components/scroll-observer"

interface InkTitleProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export default function InkTitle({ children, className = "", delay = 0 }: InkTitleProps) {
  const [isVisible, setIsVisible] = useState(false)
  const titleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isVisible && titleRef.current) {
      titleRef.current.classList.add("active")
    }
  }, [isVisible])

  return (
    <ScrollObserver
      className={`ink-splatter ${className}`}
      onIntersect={() => {
        setTimeout(() => {
          setIsVisible(true)
        }, delay * 1000)
      }}
    >
      <motion.div
        ref={titleRef}
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: delay }}
      >
        {children}
      </motion.div>
    </ScrollObserver>
  )
}
