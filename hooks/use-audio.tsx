"use client"

import { useState, useEffect, useRef } from "react"

interface UseAudioOptions {
  startMuted?: boolean
}

export function useAudio(url: string, options: UseAudioOptions = {}) {
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
          audioRef.current.remove()
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
      // Check if Web Audio API is supported
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext

      if (!AudioContext) {
        setError("Web Audio API is not supported in this browser")
        return cleanup
      }

      // Create audio element
      audioRef.current = new Audio()

      // Set properties
      audioRef.current.preload = "auto"
      audioRef.current.loop = true
      audioRef.current.volume = 0.2
      audioRef.current.muted = startMuted

      // Set source with error handling
      try {
        // Try to load the MP3 version first
        audioRef.current.src = url

        // Create a backup source for OGG format
        const sourceOGG = document.createElement("source")
        sourceOGG.src = url.replace(".mp3", ".ogg")
        sourceOGG.type = "audio/ogg"

        // Create a fallback source for WAV format
        const sourceWAV = document.createElement("source")
        sourceWAV.src = url.replace(".mp3", ".wav")
        sourceWAV.type = "audio/wav"

        // Add sources to the audio element
        audioRef.current.appendChild(sourceOGG)
        audioRef.current.appendChild(sourceWAV)

        console.log("Audio sources set:", url)
      } catch (err) {
        console.error("Error setting audio source:", err)
        setError("Failed to set audio source")
      }

      // Add event listeners
      const handleCanPlay = () => {
        console.log("Audio can play now")
        setIsLoaded(true)
      }

      const handleError = (e: Event) => {
        console.error("Audio error event:", e)

        // Get the audio element
        const audioElement = e.target as HTMLAudioElement
        let errorMessage = "Failed to load audio"

        // Check if there's a media error object
        if (audioElement && audioElement.error) {
          console.error("Audio element error code:", audioElement.error.code)
          console.error("Audio element error message:", audioElement.error.message)

          switch (audioElement.error.code) {
            case MediaError.MEDIA_ERR_ABORTED:
              errorMessage = "Audio loading aborted"
              break
            case MediaError.MEDIA_ERR_NETWORK:
              errorMessage = "Network error while loading audio"
              break
            case MediaError.MEDIA_ERR_DECODE:
              errorMessage = "Audio decoding error"
              break
            case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
              errorMessage = "Audio format not supported"
              break
            default:
              errorMessage = `Audio error: ${audioElement.error.message || "Unknown error"}`
          }
        } else {
          // If we don't have an error object, log what we can
          console.error("No specific error information available")
        }

        setError(errorMessage)
        setIsLoaded(false)
      }

      audioRef.current.addEventListener("canplaythrough", handleCanPlay)
      audioRef.current.addEventListener("error", handleError)

      // Load audio
      audioRef.current.load()

      // Create audio context for more control
      try {
        audioContextRef.current = new AudioContext()
      } catch (err) {
        console.warn("Could not create AudioContext:", err)
      }

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener("canplaythrough", handleCanPlay)
          audioRef.current.removeEventListener("error", handleError)
        }
        cleanup()
      }
    } catch (err) {
      console.error("Error setting up audio:", err)
      setError("Failed to setup audio")
      return cleanup
    }
  }, [url, startMuted])

  const toggleAudio = () => {
    resetError()

    if (!audioRef.current) {
      setError("Audio not initialized")
      return
    }

    try {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        // Create a silent audio context to unlock audio on iOS
        if (typeof window !== "undefined" && !audioContextRef.current) {
          try {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext
            if (AudioContext) {
              audioContextRef.current = new AudioContext()
              // Play a silent sound to unlock audio
              const silentBuffer = audioContextRef.current.createBuffer(1, 1, 22050)
              const source = audioContextRef.current.createBufferSource()
              source.buffer = silentBuffer
              source.connect(audioContextRef.current.destination)
              source.start()
            }
          } catch (err) {
            console.warn("Could not create AudioContext:", err)
          }
        }

        // Ensure audio is not muted when playing
        audioRef.current.muted = false

        // Resume AudioContext if it was suspended (needed for some browsers)
        if (audioContextRef.current && audioContextRef.current.state === "suspended") {
          audioContextRef.current.resume().catch((err) => {
            console.error("Failed to resume audio context:", err)
          })
        }

        // Play with promise handling
        const playPromise = audioRef.current.play()

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true)
            })
            .catch((err) => {
              console.error("Playback failed:", err)

              // Special handling for common errors
              if (err.name === "NotAllowedError") {
                setError("Browser blocked autoplay. Please click again.")
              } else if (err.name === "NotSupportedError") {
                setError("Audio format not supported")
              } else {
                setError(`Playback failed: ${err.message || "Unknown error"}`)
              }
            })
        } else {
          // Fallback for older browsers that don't return a promise
          setIsPlaying(true)
        }
      }
    } catch (err) {
      console.error("Error toggling audio:", err)
      setError(`Failed to control audio: ${err instanceof Error ? err.message : "Unknown error"}`)
    }
  }

  return { isPlaying, toggleAudio, error, isLoaded }
}
