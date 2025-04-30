"use client"

import { motion } from "framer-motion"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar />

      <main className="pt-32 pb-20">
        <section className="px-6 md:px-10 max-w-7xl mx-auto mb-20">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">Our Vision</h1>
            <p className="text-black/70 text-lg leading-relaxed">
              To create spaces that transcend the ordinary, where architecture becomes a medium for emotional and
              spiritual connection.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="aspect-[4/5] bg-black/5 rounded-lg overflow-hidden">
                <img
                  src="/placeholder.svg?height=800&width=600"
                  alt="Our vision"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-light">Bridging Emptiness and Form</h2>
              <p className="text-black/70 leading-relaxed">
                At Shunyatam Design Labs, we believe that true architecture begins with understanding emptiness. Our
                design philosophy is rooted in the ancient concept of "Shunyata" – the profound understanding that
                emptiness is not absence, but potential.
              </p>
              <p className="text-black/70 leading-relaxed">
                We approach each project as a journey from emptiness to form, allowing the essence of space to guide our
                creative process. Through this mindful approach, we create architecture that is not only visually
                striking but also emotionally resonant and functionally impeccable.
              </p>
              <p className="text-black/70 leading-relaxed">
                Our vision extends beyond mere buildings – we create experiences, emotions, and connections through
                thoughtful spatial design that honors both tradition and innovation.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="px-6 md:px-10 py-20 bg-black text-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-light mb-6">Our Team</h2>
              <p className="text-white/70 text-lg leading-relaxed">
                A collective of visionaries, dreamers, and meticulous craftspeople dedicated to transforming spaces and
                lives.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                { name: "Arya Sharma", role: "Principal Architect & Founder" },
                { name: "Maya Patel", role: "Design Director" },
                { name: "Rohan Kapoor", role: "Technical Director" },
                { name: "Zara Ahmed", role: "Interior Design Lead" },
                { name: "Vikram Singh", role: "Sustainability Specialist" },
                { name: "Leila Desai", role: "Project Manager" },
              ].map((member, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <div className="aspect-square bg-white/10 rounded-full overflow-hidden mb-6 mx-auto max-w-[240px]">
                    <img
                      src={`/placeholder.svg?height=240&width=240&text=${member.name}`}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-light mb-1">{member.name}</h3>
                  <p className="text-white/70 text-sm">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 py-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-light mb-6">Our Approach</h2>
              <p className="text-black/70 text-lg leading-relaxed">
                We believe in a holistic design process that honors both tradition and innovation, creating spaces that
                are timeless yet contemporary.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                {
                  title: "Listen",
                  description:
                    "We begin by deeply understanding your needs, aspirations, and the essence of the project.",
                },
                {
                  title: "Explore",
                  description:
                    "We investigate possibilities, pushing boundaries while respecting constraints and context.",
                },
                {
                  title: "Create",
                  description: "We transform concepts into reality, crafting spaces that inspire and endure.",
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="p-8 border border-black/10 rounded-lg hover:bg-black/5 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 * index }}
                >
                  <div className="text-5xl font-light mb-6">{index + 1}</div>
                  <h3 className="text-2xl font-light mb-4">{step.title}</h3>
                  <p className="text-black/70">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
