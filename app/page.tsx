"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ArrowDown, Volume2, VolumeX } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useAudio } from "@/hooks/use-audio"
import { useAudioFallback } from "@/hooks/use-audio-fallback"
import Particles from "@/components/particles"
import ScrollObserver from "@/components/scroll-observer"
import InkTitle from "@/components/ink-title"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ChevronRight, Play } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"


export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [animationStage, setAnimationStage] = useState(0)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [useFallback, setUseFallback] = useState(false)

  // Try to use the main audio hook first
  const mainAudio = useAudio("/sounds/ambient.mp3", { startMuted: true })
  // Also initialize the fallback
  const fallbackAudio = useAudioFallback("/sounds/ambient.mp3", { startMuted: true })

  // Use the appropriate audio controller based on whether we need the fallback
  const { toggleAudio, isPlaying, error, isLoaded } = useFallback ? fallbackAudio : mainAudio

  // If the main audio has an error, switch to fallback
  useEffect(() => {
    if (mainAudio.error && !useFallback) {
      console.log("Switching to audio fallback due to error:", mainAudio.error)
      setUseFallback(true)
    }
  }, [mainAudio.error, useFallback])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // Map scroll progress to animation stages
  const stageProgress = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0, 1, 2, 3, 4, 5])

  useEffect(() => {
    const unsubscribe = stageProgress.on("change", (latest) => {
      setAnimationStage(Math.floor(latest))
    })

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setHasScrolled(true)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      unsubscribe()
      window.removeEventListener("scroll", handleScroll)
    }
  }, [stageProgress])

  const stages = [
    {
      name: "Bindu",
      description: "The origin point, where all creation begins",
    },
    {
      name: "Sandhi",
      description: "The connections forming, bridging emptiness with form",
    },
    {
      name: "Madhya",
      description: "The middle path, where structure takes shape",
    },
    {
      name: "Sthiti",
      description: "The stability, where architecture finds its purpose",
    },
    {
      name: "Shringā",
      description: "The pinnacle of creation, where beauty meets function",
    },
    {
      name: "Shunyatam",
      description: "Where emptiness and form become one",
    },
  ]

  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar />

      {/* Background Particles */}
      <div className="particles-container">
        <Particles id="background-particles" quantity={30} color="#000000" shape="circle" />
      </div>

      {/* Sound toggle button */}
      <button
        onClick={toggleAudio}
        className="fixed bottom-6 right-6 z-50 bg-black/10 backdrop-blur-sm p-3 rounded-full hover:bg-black/20 transition-all"
        aria-label={isPlaying ? "Mute sound" : "Play sound"}
      >
        {useFallback ? (
          isPlaying ? (
            <Volume2 size={24} className="text-yellow-600" title="Sound simulation (audio unavailable)" />
          ) : (
            <VolumeX size={24} className="text-yellow-600" title="Sound simulation (audio unavailable)" />
          )
        ) : error ? (
          <VolumeX className="text-red-500" size={24} title={error} />
        ) : !isLoaded ? (
          <div className="w-6 h-6 rounded-full border-2 border-black border-t-transparent animate-spin"></div>
        ) : isPlaying ? (
          <Volume2 size={24} />
        ) : (
          <VolumeX size={24} />
        )}
      </button>

      {/* Scroll indicator */}
      <AnimatePresence>
        {!hasScrolled && (
          <motion.div
            className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 2 }}
          >
            <p className="text-sm mb-2 font-light">Scroll to experience</p>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}>
              <ArrowDown size={20} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animation container */}
      <div ref={containerRef} className="h-[500vh] relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          {/* Animation Stage: Bindu */}
          <AnimatePresence>
            {animationStage === 0 && (
              <motion.div
                className="absolute"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <motion.div
                  className="w-4 h-4 bg-black rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Animation Stage: Sandhi */}
          <AnimatePresence>
            {animationStage === 1 && (
              <motion.div
                className="absolute w-full h-full flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative w-[300px] h-[300px]">
                  <motion.div className="absolute top-1/2 left-1/2 w-4 h-4 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2" />
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute top-1/2 left-1/2 w-[1px] h-0 bg-black transform -translate-x-1/2 origin-bottom"
                      style={{ rotate: `${i * 45}deg` }}
                      initial={{ height: 0 }}
                      animate={{ height: 150 }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                    />
                  ))}
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute top-1/2 left-1/2 w-0 h-[1px] bg-black transform -translate-y-1/2 origin-left"
                      style={{ rotate: `${i * 90}deg` }}
                      initial={{ width: 0 }}
                      animate={{ width: 150 }}
                      transition={{ duration: 1, delay: 0.8 + i * 0.1 }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Animation Stage: Madhya */}
          <AnimatePresence>
            {animationStage === 2 && (
              <motion.div
                className="absolute w-full h-full flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative w-[400px] h-[400px]">
                  <motion.div className="absolute top-1/2 left-1/2 w-4 h-4 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2" />
                  {/* Grid lines */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute top-1/2 left-1/2 w-[1px] h-[300px] bg-black/30 transform -translate-x-1/2 origin-bottom"
                      style={{ rotate: `${i * 45}deg` }}
                    />
                  ))}
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute top-1/2 left-1/2 w-[300px] h-[1px] bg-black/30 transform -translate-y-1/2 origin-left"
                      style={{ rotate: `${i * 90}deg` }}
                    />
                  ))}

                  {/* Geometric shapes */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 w-[200px] h-[200px] border-2 border-black transform -translate-x-1/2 -translate-y-1/2"
                    initial={{ opacity: 0, rotate: 0 }}
                    animate={{ opacity: 1, rotate: 45 }}
                    transition={{ duration: 1.5 }}
                  />
                  <motion.div
                    className="absolute top-1/2 left-1/2 w-[100px] h-[100px] border-2 border-black transform -translate-x-1/2 -translate-y-1/2"
                    initial={{ opacity: 0, rotate: 0 }}
                    animate={{ opacity: 1, rotate: -45 }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                  />
                  <motion.div
                    className="absolute top-1/2 left-1/2 w-[150px] h-[150px] border-2 border-black rounded-full transform -translate-x-1/2 -translate-y-1/2"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, delay: 0.6 }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Animation Stage: Sthiti */}
          <AnimatePresence>
            {animationStage === 3 && (
              <motion.div
                className="absolute w-full h-full flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="relative w-[600px] h-[400px] perspective-[1000px]"
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.5 }}
                >
                  {/* 3D architectural form */}
                  <motion.div
                    className="absolute w-[300px] h-[200px] bg-white border-2 border-black top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    style={{ transformStyle: "preserve-3d" }}
                    initial={{ rotateX: 0, rotateY: 0 }}
                    animate={{ rotateX: 15, rotateY: 15 }}
                    transition={{ duration: 2 }}
                  >
                    {/* Roof */}
                    <motion.div
                      className="absolute w-[300px] h-[200px] bg-white border-2 border-black origin-bottom"
                      style={{
                        transform: "rotateX(-30deg) translateY(-200px)",
                        transformStyle: "preserve-3d",
                      }}
                    />

                    {/* Side wall */}
                    <motion.div
                      className="absolute w-[200px] h-[200px] bg-white border-2 border-black origin-left"
                      style={{
                        transform: "rotateY(90deg) translateX(-150px)",
                        transformStyle: "preserve-3d",
                      }}
                    />

                    {/* Windows */}
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-[40px] h-[40px] bg-black/10 border border-black"
                        style={{
                          top: "50px",
                          left: `${50 + i * 60}px`,
                          transformStyle: "preserve-3d",
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 + i * 0.2 }}
                      />
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Animation Stage: Shringā */}
          <AnimatePresence>
            {animationStage === 4 && (
              <motion.div
                className="absolute w-full h-full flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="relative w-full max-w-[1000px] h-[600px] overflow-hidden rounded-lg"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.5 }}
                >
                  <motion.img
                    src="/1.webp?height=600&width=1000&text=Architectural+Masterpiece"
                    alt="Architectural masterpiece"
                    className="w-full h-full object-cover"
                    initial={{ filter: "brightness(0.5)" }}
                    animate={{ filter: "brightness(1)" }}
                    transition={{ duration: 2 }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2, delay: 0.5 }}
                  />
                  <motion.div
                    className="absolute bottom-10 left-10 text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1 }}
                  >
                    <h2 className="text-3xl font-light mb-2">Architectural Harmony</h2>
                    <p className="text-sm font-light max-w-md">
                      Where form meets function in perfect balance, creating spaces that inspire and elevate the human
                      experience.
                    </p>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Animation Stage: End */}
          <AnimatePresence>
            {animationStage === 5 && (
              <motion.div
                className="absolute w-full h-full flex items-center justify-center bg-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <motion.div
                    className="mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 100, delay: 0.8 }}
                  >
                    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="60" cy="60" r="59" stroke="black" strokeWidth="2" />
                      <circle cx="60" cy="60" r="6" fill="black" />
                      <line x1="60" y1="20" x2="60" y2="100" stroke="black" strokeWidth="1" />
                      <line x1="20" y1="60" x2="100" y2="60" stroke="black" strokeWidth="1" />
                      <line x1="31.7157" y1="31.7157" x2="88.2843" y2="88.2843" stroke="black" strokeWidth="1" />
                      <line x1="31.7157" y1="88.2843" x2="88.2843" y2="31.7157" stroke="black" strokeWidth="1" />
                    </svg>
                  </motion.div>
                  <motion.h1
                    className="text-4xl md:text-6xl font-light mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                  >
                    SHUNYATAM
                  </motion.h1>
                  <motion.p
                    className="text-lg font-light text-black/70"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                  >
                    Where emptiness becomes form
                  </motion.p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stage indicator */}
          <div className="absolute bottom-10 left-10 flex flex-col gap-2">
            {stages.map((stage, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3"
                initial={{ opacity: 0.3 }}
                animate={{ opacity: animationStage === index ? 1 : 0.3 }}
              >
                <div className="w-[6px] h-[6px] rounded-full bg-black" />
                <p className="text-xs font-light">{stage.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Sections - Immersive Style */}
      <section className="immersive-section">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <ScrollObserver className="fade-in">
            <InkTitle className="mb-16 text-center">
              <h2 className="text-4xl md:text-5xl lg:text-6xl">Our Philosophy</h2>
            </InkTitle>
          </ScrollObserver>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
            <ScrollObserver className="fade-in md:col-span-5">
              <div className="space-y-6">
                <p className="text-black/70 leading-relaxed">
                  At Shunyatam Design Labs, we believe that architecture is not merely about constructing buildings, but
                  about creating spaces that resonate with the human spirit. Our design philosophy is rooted in the
                  concept of "Shunyata" – the profound understanding of emptiness as potential.
                </p>
                <p className="text-black/70 leading-relaxed">
                  We approach each project as a journey from emptiness to form, allowing the essence of space to guide
                  our creative process. Through this mindful approach, we create architecture that is not only visually
                  striking but also emotionally resonant and functionally impeccable.
                </p>
              </div>
            </ScrollObserver>

            <ScrollObserver className="fade-in md:col-span-7">
              <div className="relative">
                <div className="aspect-square bg-black/5 rounded-lg overflow-hidden immersive-image">
                  <img
                    src="/philosophy.gif?height=600&width=600&text=Architectural+Concept"
                    alt="Architectural concept"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-[#f0e6d2] rounded-lg -z-10"></div>
              </div>
            </ScrollObserver>
          </div>
        </div>
      </section>

      <section className="relative h-screen bg-sky-100">
        <div className="absolute inset-0 z-0">
          <Image
            src="/2.png"
            alt="Modern luxury home"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="container relative z-10 flex flex-col items-center justify-center h-full text-center px-4 mx-auto">
          <h1 className="text-4xl md:text-6xl font-light text-gray-800 mb-4">
            Extraordinary
            <br />
            living begins here.
          </h1>
          <p className="text-gray-600 max-w-md mb-8">
            Discover the perfect balance of luxury and comfort in our curated collection of exceptional homes.
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="rounded-full border-gray-400 text-gray-600">
              See our properties
            </Button>
            <Button variant="ghost" className="rounded-full flex items-center gap-2 text-gray-600">
              <Play size={16} className="fill-gray-600" /> Watch showreel
            </Button>
          </div>
        </div>
      </section>


      {/* Vision Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-medium mb-4">
            Where your vision finds its{" "}
            <span className="inline-flex items-center">
              <Image src="1.webp" alt="Leaf icon" width={50} height={30} className="mx-1" />
              home.
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Vision. Artistry. Craftsmanship. We bring together the finest architects and designers to create homes that
            transcend the ordinary.
          </p>
          <div className="flex justify-center gap-4">
            <Button className="rounded-full bg-black text-white hover:bg-gray-800">Get Started</Button>
          </div>
        </div>
      </section>

      {/* Property Showcase */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-medium mb-12">
            Discover homes
            <br />
            designed to inspire.
          </h2>

          <div className="relative overflow-hidden">
            <div className="flex gap-4 overflow-x-auto pb-8 snap-x">
              <div className="min-w-[280px] md:min-w-[350px] snap-start">
                <div className="rounded-lg overflow-hidden mb-4">
                  <Image
                    src="1.webp"
                    alt="Acacia Retreat"
                    width={350}
                    height={250}
                    className="object-cover w-full h-[250px]"
                  />
                </div>
                <h3 className="font-medium text-lg">Acacia Retreat</h3>
                <p className="text-gray-900 font-medium">$3,500,000</p>
              </div>

              <div className="min-w-[280px] md:min-w-[350px] snap-start opacity-60">
                <div className="rounded-lg overflow-hidden mb-4">
                  <Image
                    src="1.webp"
                    alt="Modern Villa"
                    width={350}
                    height={250}
                    className="object-cover w-full h-[250px]"
                  />
                </div>
                <h3 className="font-medium text-lg">Modern Villa</h3>
                <p className="text-gray-900 font-medium">$4,200,000</p>
              </div>

              <div className="min-w-[280px] md:min-w-[350px] snap-start opacity-60">
                <div className="rounded-lg overflow-hidden mb-4">
                  <Image
                    src="1.webp"
                    alt="Coastal Mansion"
                    width={350}
                    height={250}
                    className="object-cover w-full h-[250px]"
                  />
                </div>
                <h3 className="font-medium text-lg">Coastal Mansion</h3>
                <p className="text-gray-900 font-medium">$5,800,000</p>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 flex gap-1">
              <span className="w-8 h-1 bg-black rounded-full"></span>
              <span className="w-8 h-1 bg-gray-300 rounded-full"></span>
              <span className="w-8 h-1 bg-gray-300 rounded-full"></span>
            </div>
          </div>
        </div>
      </section>

      {/* Art of Living Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-medium mb-16 max-w-md">
            The art of exceptional living begins in the details.
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="border-t pt-4">
                <h3 className="font-medium">Unparalleled Craftsmanship</h3>
              </div>
              <div className="border-t pt-4">
                <h3 className="font-medium">Personalization Design</h3>
              </div>
              <div className="border-t pt-4">
                <h3 className="font-medium">Exclusive Locations</h3>
              </div>
              <div className="border-t pt-4">
                <h3 className="font-medium">Modern Innovation</h3>
              </div>
              <div className="border-t pt-4">
                <h3 className="font-medium">Seamless Experience</h3>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden">
              <Image
                src="1.webp"
                alt="Luxury interior"
                width={500}
                height={400}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Outdoor Living Section */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="container mx-auto">
          <div className="relative rounded-lg overflow-hidden">
            <Image
              src="1.webp"
              alt="Outdoor living space"
              width={1200}
              height={400}
              className="object-cover w-full h-[400px]"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="text-white text-center max-w-2xl px-4">
                <h2 className="text-2xl md:text-3xl font-medium mb-4">
                  Step into a world where exceptional design and timeless luxury meet.
                </h2>
                <Button variant="outline" className="rounded-full text-white border-white hover:bg-white/20">
                  Explore our properties
                </Button>
              </div>
            </div>
            <div className="absolute bottom-4 right-4 bg-white rounded-full p-2">
              <Play size={24} className="fill-black" />
            </div>
          </div>
        </div>
      </section>

      {/* Insights Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-2xl md:text-3xl font-medium">
              Discover insights,
              <br />
              trends, and inspiration.
            </h2>
            <div className="flex gap-1">
              <span className="w-8 h-1 bg-black rounded-full"></span>
              <span className="w-8 h-1 bg-gray-300 rounded-full"></span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-lg overflow-hidden">
              <div className="relative">
                <Image
                  src="1.webp"
                  alt="Luxury building"
                  width={400}
                  height={200}
                  className="object-cover w-full h-[200px]"
                />
                <div className="absolute top-4 left-4 bg-black text-white text-xs px-2 py-1 rounded">FEATURED</div>
              </div>
              <div className="bg-gray-100 p-6">
                <h3 className="font-medium text-lg mb-2">The Rise of Boutique Architecture in Luxury Living</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Exploring how small-scale, high-quality architectural projects are redefining luxury in urban
                  environments.
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                  <span className="text-xs">John Architect</span>
                  <div className="ml-auto">
                    <Button variant="ghost" size="sm" className="h-6 rounded-full bg-red-500 text-white text-xs px-2">
                      Read
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden">
              <div className="relative">
                <Image
                  src="1.webp"
                  alt="Smart home technology"
                  width={400}
                  height={200}
                  className="object-cover w-full h-[200px]"
                />
                <div className="absolute top-4 left-4 bg-blue-500 text-white text-xs px-2 py-1 rounded">DESIGN</div>
              </div>
              <div className="bg-gray-100 p-6">
                <h3 className="font-medium text-lg mb-2">The Value of Smart Home Integration in Modern Residences</h3>
                <p className="text-gray-600 text-sm mb-4">
                  How technology is seamlessly blending with architectural design for enhanced living experiences.
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                  <span className="text-xs">Sarah Designer</span>
                  <div className="ml-auto">
                    <Button variant="ghost" size="sm" className="h-6 rounded-full bg-blue-500 text-white text-xs px-2">
                      Read
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden">
              <div className="relative">
                <Image
                  src="1.webp"
                  alt="Luxury bathroom"
                  width={400}
                  height={200}
                  className="object-cover w-full h-[200px]"
                />
                <div className="absolute top-4 left-4 bg-yellow-500 text-white text-xs px-2 py-1 rounded">TRENDS</div>
              </div>
              <div className="bg-gray-100 p-6">
                <h3 className="font-medium text-lg mb-2">Luxury Bathrooms: The Evolution of Personal Sanctuaries</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Exploring the transformation of bathrooms from functional spaces to personal wellness retreats.
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                  <span className="text-xs">Michael Designer</span>
                  <div className="ml-auto">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 rounded-full bg-yellow-500 text-white text-xs px-2"
                    >
                      Read
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-medium mb-12">
            Frequently
            <br />
            asked questions.
          </h2>

          <Accordion type="single" collapsible className="max-w-3xl">
            <AccordionItem value="item-1" className="border-t border-b py-4">
              <AccordionTrigger className="text-left font-medium">
                Can I customize the design of my dream home?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Yes, we offer comprehensive customization options. Our design team works closely with you to understand
                your vision and preferences, ensuring your home reflects your unique style and needs.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-b py-4">
              <AccordionTrigger className="text-left font-medium">
                What is the process for purchasing a luxury home?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Our purchasing process begins with a consultation to understand your requirements, followed by property
                viewings, financial arrangements, and a seamless closing process guided by our experienced team.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-b py-4">
              <AccordionTrigger className="text-left font-medium">
                Do you offer fully custom-built homes?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Absolutely. We specialize in creating bespoke homes tailored to your specifications, from architectural
                design to interior finishes and landscaping.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-b py-4">
              <AccordionTrigger className="text-left font-medium">
                How long does it take to complete a home?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                The timeline varies depending on the scope and complexity of the project. Typically, our custom homes
                take between 12-18 months from design approval to completion, ensuring meticulous attention to every
                detail.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-sky-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-medium mb-4">
            Your dream
            <br />
            home awaits.
          </h2>
          <p className="text-gray-600 max-w-md mx-auto mb-8">
            Take the first step toward extraordinary living. Contact our team to explore our available properties or
            discuss your custom home vision.
          </p>
          <Button className="rounded-full bg-white text-gray-800 hover:bg-gray-100">
            Get in touch <ChevronRight size={16} className="ml-1" />
          </Button>
        </div>
      </section>

{/*       
      <section className="immersive-section bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <ScrollObserver className="fade-in">
            <InkTitle className="mb-16 text-center">
              <h2 className="text-4xl md:text-5xl lg:text-6xl">Our Services</h2>
            </InkTitle>
          </ScrollObserver>

          <ScrollObserver className="stagger-fade-in grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { title: "Architectural Design", icon: "✦", image: "/placeholder.svg?text=Architecture" },
              { title: "Interior Design", icon: "◇", image: "/placeholder.svg?text=Interior" },
              { title: "Urban Planning", icon: "○", image: "/placeholder.svg?text=Urban" },
              { title: "Landscape Design", icon: "△", image: "/placeholder.svg?text=Landscape" },
              { title: "Sustainable Architecture", icon: "⬡", image: "/placeholder.svg?text=Sustainable" },
              { title: "Restoration", icon: "⬢", image: "/placeholder.svg?text=Restoration" },
            ].map((service, index) => (
              <div
                key={index}
                className="p-6 border border-white/20 rounded-lg hover:bg-white/5 transition-colors group"
              >
                <div className="h-40 mb-6 overflow-hidden rounded">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-light mb-3">{service.title}</h3>
                <p className="text-white/70 text-sm">
                  Transforming visions into reality through thoughtful design and meticulous execution, creating spaces
                  that inspire and endure.
                </p>
              </div>
            ))}
          </ScrollObserver>
        </div>
      </section>

      <section className="immersive-section">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <ScrollObserver className="fade-in">
            <InkTitle className="mb-16 text-center">
              <h2 className="text-4xl md:text-5xl lg:text-6xl">Featured Projects</h2>
            </InkTitle>
          </ScrollObserver>

          <ScrollObserver className="stagger-fade-in grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Ethereal Pavilion",
                category: "Public Space",
                year: "2023",
                image: "/placeholder.svg?text=Project+1",
              },
              {
                title: "Serenity House",
                category: "Residential",
                year: "2022",
                image: "/placeholder.svg?text=Project+2",
              },
              {
                title: "Horizon Tower",
                category: "Commercial",
                year: "2023",
                image: "/placeholder.svg?text=Project+3",
              },
              {
                title: "Floating Gardens",
                category: "Landscape",
                year: "2021",
                image: "/placeholder.svg?text=Project+4",
              },
              { title: "Echo Museum", category: "Cultural", year: "2022", image: "/placeholder.svg?text=Project+5" },
              {
                title: "Prism Apartments",
                category: "Residential",
                year: "2023",
                image: "/placeholder.svg?text=Project+6",
              },
            ].map((project, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg immersive-image">
                <div className="aspect-[4/5] bg-black/5 overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white text-xl font-light mb-2">{project.title}</h3>
                  <p className="text-white/80 text-sm">
                    {project.category} • {project.year}
                  </p>
                </div>
              </div>
            ))}
          </ScrollObserver>

          <ScrollObserver className="fade-in mt-12 text-center">
            <button className="px-8 py-3 border border-black hover:bg-black hover:text-white transition-colors">
              View All Projects
            </button>
          </ScrollObserver>
        </div>
      </section> */}

      <section className="immersive-section bg-[#f8f5f0]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <ScrollObserver className="fade-in">
              <div>
                <InkTitle className="mb-6">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl">Get in Touch</h2>
                </InkTitle>
                <p className="text-black/70 mb-10 leading-relaxed">
                  We'd love to hear about your project. Let's create something extraordinary together.
                </p>
                <form className="grid gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                      type="text"
                      placeholder="Name"
                      className="bg-transparent border-b border-black/30 py-2 px-1 focus:outline-none focus:border-black"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="bg-transparent border-b border-black/30 py-2 px-1 focus:outline-none focus:border-black"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Subject"
                    className="bg-transparent border-b border-black/30 py-2 px-1 focus:outline-none focus:border-black"
                  />
                  <textarea
                    placeholder="Message"
                    rows={4}
                    className="bg-transparent border-b border-black/30 py-2 px-1 focus:outline-none focus:border-black resize-none"
                  />
                  <div>
                    <button className="px-8 py-3 bg-black text-white hover:bg-black/80 transition-colors">
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </ScrollObserver>

            <ScrollObserver className="fade-in">
              <div className="relative">
                <div className="aspect-square bg-black/5 rounded-lg overflow-hidden immersive-image">
                  <img src="/placeholder.svg?text=Contact" alt="Contact" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -top-8 -right-8 w-40 h-40 bg-[#e6d2f0] rounded-lg -z-10"></div>
              </div>
            </ScrollObserver>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
