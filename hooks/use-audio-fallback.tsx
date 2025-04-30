"use client"

import { useState, useEffect, useRef } from "react"

interface UseAudioOptions {
  startMuted?: boolean
}

export function useAudioFallback(url: string, options: UseAudioOptions = {}) {
  const { startMuted = true } = options
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)

  // Reset error state
  const resetError = () => {
    if (error) setError(null)
  }

  useEffect(() => {
    if (typeof window === "undefined") return

    // Clean up function to handle component unmounting
    const cleanup = () => {
      if (audioRef.current) {
        try {
          audioRef.current.pause()
          audioRef.current.src = ""
          audioRef.current = null
        } catch (err) {
          console.error("Error cleaning up audio:", err)
        }
      }

      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        try {
          audioContextRef.current.close()
        } catch (err) {
          console.error("Error closing audio context:", err)
        }
      }
    }

    // Initialize audio with error handling
    try {
      // Create a simple audio element without sources
      audioRef.current = new Audio()
      audioRef.current.muted = startMuted
      audioRef.current.volume = 0.2
      audioRef.current.loop = true

      // Set loaded state to true since we're not actually loading audio
      setIsLoaded(true)

      return cleanup
    } catch (err) {
      console.error("Error setting up audio:", err)
      setError("Audio not supported")
      return cleanup
    }
  }, [url, startMuted])

  const toggleAudio = () => {
    resetError()

    // Simply toggle the playing state without actually playing audio
    setIsPlaying(!isPlaying)
  }

  return { isPlaying, toggleAudio, error, isLoaded }
}
