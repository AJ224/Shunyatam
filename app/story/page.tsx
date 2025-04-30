"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function StoryPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0])
  const opacity2 = useTransform(scrollYProgress, [0.1, 0.2, 0.3, 0.4], [0, 1, 1, 0])
  const opacity3 = useTransform(scrollYProgress, [0.3, 0.4, 0.5, 0.6], [0, 1, 1, 0])
  const opacity4 = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.8], [0, 1, 1, 0])
  const opacity5 = useTransform(scrollYProgress, [0.7, 0.8, 0.9, 1.0], [0, 1, 1, 0])

  const scale1 = useTransform(scrollYProgress, [0, 0.1], [1, 1.2])
  const scale2 = useTransform(scrollYProgress, [0.1, 0.2, 0.3], [0.8, 1, 1.2])
  const scale3 = useTransform(scrollYProgress, [0.3, 0.4, 0.5], [0.8, 1, 1.2])
  const scale4 = useTransform(scrollYProgress, [0.5, 0.6, 0.7], [0.8, 1, 1.2])
  const scale5 = useTransform(scrollYProgress, [0.7, 0.8, 0.9], [0.8, 1, 1.2])

  const stages = [
    {
      name: "Bindu",
      description:
        "The origin point, where all creation begins. In the beginning, there was only potential – a single point of infinite possibility. This is where our journey began, with a vision to create architecture that transcends the ordinary.",
      opacity: opacity1,
      scale: scale1,
    },
    {
      name: "Sandhi",
      description:
        "The connections forming, bridging emptiness with form. As our vision took shape, we began to forge connections – between spaces and emotions, between tradition and innovation, between the seen and unseen.",
      opacity: opacity2,
      scale: scale2,
    },
    {
      name: "Madhya",
      description:
        "The middle path, where structure takes shape. With our foundations firmly established, we began to explore the balance between form and function, aesthetics and practicality, creating a harmonious middle path.",
      opacity: opacity3,
      scale: scale3,
    },
    {
      name: "Sthiti",
      description:
        "The stability, where architecture finds its purpose. Our philosophy crystallized into a stable framework – a commitment to creating spaces that not only shelter but inspire, that not only exist but speak to the human spirit.",
      opacity: opacity4,
      scale: scale4,
    },
    {
      name: "Shringā",
      description:
        "The pinnacle of creation, where beauty meets function. Today, Shunyatam Design Labs stands at the pinnacle of architectural innovation – creating spaces that are not merely built but born from a deep understanding of emptiness and form.",
      opacity: opacity5,
      scale: scale5,
    },
  ]

  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar />

      <main className="pt-20">
        <section className="px-6 md:px-10 py-20 text-center">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">Our Story</h1>
            <p className="text-black/70 text-lg leading-relaxed">
              The journey of Shunyatam Design Labs is a testament to our belief in the transformative power of
              architecture – a journey from emptiness to form, from vision to reality.
            </p>
          </motion.div>
        </section>

        <div ref={containerRef} className="h-[500vh] relative">
          {stages.map((stage, index) => (
            <div key={index} className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
              <motion.div
                className="max-w-4xl mx-auto px-6 md:px-10 text-center"
                style={{ opacity: stage.opacity, scale: stage.scale }}
              >
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-light mb-8">{stage.name}</h2>
                <p className="text-black/70 text-lg md:text-xl leading-relaxed">{stage.description}</p>
              </motion.div>
            </div>
          ))}
        </div>

        <section className="px-6 md:px-10 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-light mb-6">Our Journey Continues</h2>
                <p className="text-black/70 mb-6 leading-relaxed">
                  As we look to the future, we remain committed to our founding principles – creating architecture that
                  honors emptiness as much as form, that speaks to the soul as much as to the eye.
                </p>
                <p className="text-black/70 leading-relaxed">
                  Our journey is ongoing, a continuous exploration of the possibilities that lie at the intersection of
                  art, science, and human experience. We invite you to join us on this journey, to experience spaces
                  that transform not just how you live, but how you feel.
                </p>
              </div>
              <div className="relative">
                <div className="aspect-square bg-black/5 rounded-lg overflow-hidden">
                  <img
                    src="/placeholder.svg?height=600&width=600"
                    alt="Our journey"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-[#d2f0e6] rounded-lg -z-10"></div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
