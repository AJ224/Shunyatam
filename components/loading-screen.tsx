"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import Particles from "@/components/particles"

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const particlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 5
        return newProgress >= 100 ? 100 : newProgress
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (progress === 100) {
      // Wait a bit before hiding the loading screen
      setTimeout(() => {
        setIsLoaded(true)

        // After fade out animation completes, remove from DOM
        setTimeout(() => {
          setIsHidden(true)
        }, 1000)
      }, 500)
    }
  }, [progress])

  if (isHidden) return null

  return (
    <div className={`loading-screen ${isLoaded ? "loaded" : ""}`}>
      <div className="relative w-[300px] h-[300px]">
        <Particles
          id="loading-particles"
          className="absolute inset-0"
          quantity={30}
          color="#ffffff"
          shape="circle"
          direction="outside"
        />

        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.circle
              cx="60"
              cy="60"
              r="59"
              stroke="white"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: progress / 100 }}
              transition={{ duration: 0.5 }}
            />
            <motion.circle
              cx="60"
              cy="60"
              r="6"
              fill="white"
              initial={{ scale: 0 }}
              animate={{ scale: progress > 30 ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            />
            <motion.line
              x1="60"
              y1="20"
              x2="60"
              y2="100"
              stroke="white"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: progress > 40 ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            />
            <motion.line
              x1="20"
              y1="60"
              x2="100"
              y2="60"
              stroke="white"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: progress > 50 ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            />
            <motion.line
              x1="31.7157"
              y1="31.7157"
              x2="88.2843"
              y2="88.2843"
              stroke="white"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: progress > 70 ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            />
            <motion.line
              x1="31.7157"
              y1="88.2843"
              x2="88.2843"
              y2="31.7157"
              stroke="white"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: progress > 90 ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            />
          </svg>
        </motion.div>
      </div>

      <motion.h1
        className="text-white text-3xl mt-8 font-playfair font-light"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        SHU.NYATAM
      </motion.h1>

      <div className="loading-bar">
        <div className="loading-progress" style={{ width: `${progress}%` }}></div>
      </div>

      <motion.p
        className="text-white/70 mt-4 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        {Math.round(progress)}%
      </motion.p>
    </div>
  )
}
