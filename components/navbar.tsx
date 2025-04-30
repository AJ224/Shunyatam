"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    // { name: "Our Story", href: "/story" },
    // { name: "Process", href: "/process" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Services", href: "/services" },
    // { name: "Products", href: "/products" },
    // { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/90 backdrop-blur-sm py-3 shadow-sm" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="text-black text-xl font-playfair font-light">
            SHU.NYATAM
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-sm text-black/80 hover:text-black transition-colors ink-splatter"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <button className="md:hidden text-black" onClick={toggleMenu} aria-label="Toggle menu">
            <Menu size={24} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-white z-50 flex flex-col"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center p-6 border-b">
              <Link href="/" className="text-black text-xl font-playfair font-light">
                SHU.NYATAM
              </Link>
              <button onClick={toggleMenu} aria-label="Close menu">
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col p-6 space-y-6">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-lg text-black/80 hover:text-black transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
