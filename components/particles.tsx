"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface ParticleProps {
  id: string
  className?: string
  quantity?: number
  color?: string
  shape?: "circle" | "square" | "triangle"
  direction?: "inside" | "outside" | "random"
}

interface Particle {
  id: number
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
}

export default function Particles({
  id,
  className = "",
  quantity = 50,
  color = "#000000",
  shape = "circle",
  direction = "random",
}: ParticleProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [particles, setParticles] = useState<Particle[]>([])
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const animationRef = useRef<number>()
  const lastTimeRef = useRef<number>(0)

  // Initialize particles
  useEffect(() => {
    if (!containerRef.current) return

    const { width, height } = containerRef.current.getBoundingClientRect()
    setDimensions({ width, height })

    const newParticles: Particle[] = []
    for (let i = 0; i < quantity; i++) {
      const size = Math.random() * 3 + 1
      const x = Math.random() * width
      const y = Math.random() * height

      let speedX = (Math.random() - 0.5) * 0.5
      let speedY = (Math.random() - 0.5) * 0.5

      // Adjust direction based on the direction prop
      if (direction === "inside") {
        // Particles move toward center
        speedX = x > width / 2 ? -Math.abs(speedX) : Math.abs(speedX)
        speedY = y > height / 2 ? -Math.abs(speedY) : Math.abs(speedY)
      } else if (direction === "outside") {
        // Particles move away from center
        speedX = x > width / 2 ? Math.abs(speedX) : -Math.abs(speedX)
        speedY = y > height / 2 ? Math.abs(speedY) : -Math.abs(speedY)
      }

      newParticles.push({
        id: i,
        x,
        y,
        size,
        speedX,
        speedY,
        opacity: Math.random() * 0.5 + 0.3,
      })
    }

    setParticles(newParticles)

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return
      const { width, height } = containerRef.current.getBoundingClientRect()
      setDimensions({ width, height })
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [quantity, direction])

  // Animation loop
  useEffect(() => {
    if (particles.length === 0 || !containerRef.current) return

    const animate = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time
      const deltaTime = time - lastTimeRef.current
      lastTimeRef.current = time

      setParticles((prevParticles) =>
        prevParticles.map((particle) => {
          let { x, y, speedX, speedY } = particle

          // Update position
          x += speedX * (deltaTime / 16)
          y += speedY * (deltaTime / 16)

          // Bounce off walls
          if (x <= 0 || x >= dimensions.width) {
            speedX = -speedX
            x = x <= 0 ? 0 : dimensions.width
          }

          if (y <= 0 || y >= dimensions.height) {
            speedY = -speedY
            y = y <= 0 ? 0 : dimensions.height
          }

          return {
            ...particle,
            x,
            y,
            speedX,
            speedY,
          }
        }),
      )

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [particles, dimensions])

  // Render particles
  const renderParticle = (particle: Particle) => {
    const { id: particleId, x, y, size, opacity } = particle

    // Create style object without the key
    const style = {
      position: "absolute" as const,
      left: `${x}px`,
      top: `${y}px`,
      opacity,
      backgroundColor: color,
    }

    switch (shape) {
      case "square":
        return (
          <motion.div
            key={particleId}
            className="transform -translate-x-1/2 -translate-y-1/2"
            style={{
              ...style,
              width: `${size}px`,
              height: `${size}px`,
            }}
            animate={{
              rotate: [0, 180],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        )
      case "triangle":
        return (
          <motion.div
            key={particleId}
            className="transform -translate-x-1/2 -translate-y-1/2"
            style={{
              ...style,
              width: 0,
              height: 0,
              borderLeft: `${size}px solid transparent`,
              borderRight: `${size}px solid transparent`,
              borderBottom: `${size * 1.5}px solid ${color}`,
              backgroundColor: "transparent",
            }}
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 30,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        )
      case "circle":
      default:
        return (
          <motion.div
            key={particleId}
            className="rounded-full transform -translate-x-1/2 -translate-y-1/2"
            style={{
              ...style,
              width: `${size}px`,
              height: `${size}px`,
            }}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              repeatType: "reverse",
              delay: Math.random() * 2,
            }}
          />
        )
    }
  }

  return (
    <div id={id} ref={containerRef} className={`relative w-full h-full ${className}`}>
      {particles.map(renderParticle)}
    </div>
  )
}
