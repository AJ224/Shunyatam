import Link from "next/link"
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-sky-100 text-black py-16 px-6 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <h3 className="text-xl font-light mb-6">SHUNYATAM</h3>
          <p className="text-black/70 text-sm leading-relaxed">
            Where emptiness becomes form, and architecture transcends the ordinary to create spaces that inspire and
            elevate the human experience.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-medium uppercase tracking-wider mb-6">Navigation</h4>
          <ul className="space-y-3">
            {["Home", "About", "Portfolio", "Services", "Products", "Contact"].map((item, index) => (
              <li key={index}>
                <Link
                  href={`/${item.toLowerCase()}`}
                  className="text-black/70 hover:text-black transition-colors text-sm"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* <div>
          <h4 className="text-sm font-medium uppercase tracking-wider mb-6">Contact</h4>
          <ul className="space-y-3 text-white/70 text-sm">
            <li>123 Design Avenue</li>
            <li>New York, NY 10001</li>
            <li>United States</li>
            <li className="pt-2">info@shunyatam.com</li>
            <li>+1 (555) 123-4567</li>
          </ul>
        </div> */}

        <div>
          <h4 className="text-sm font-medium uppercase tracking-wider mb-6">Follow Us</h4>
          <div className="flex space-x-4">
            <Link href="#" className="text-black/70 hover:text-black transition-colors">
              <Facebook size={20} />
            </Link>
            <Link href="#" className="text-black/70 hover:text-black transition-colors">
              <Instagram size={20} />
            </Link>
            <Link href="#" className="text-black/70 hover:text-black transition-colors">
              <Twitter size={20} />
            </Link>
            <Link href="#" className="text-black/70 hover:text-black transition-colors">
              <Linkedin size={20} />
            </Link>
          </div>
          <div className="mt-8">
            <h4 className="text-sm font-medium uppercase tracking-wider mb-4">Newsletter</h4>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-black/10 px-3 py-2 text-sm focus:outline-none flex-grow"
              />
              <button className="bg-white text-black px-4 py-2 text-sm">Subscribe</button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-black/10 text-black/50 text-sm flex flex-col md:flex-row justify-between items-center">
        <p>© {new Date().getFullYear()} Shunyatam Design Labs. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link href="/privacy" className="hover:text-black transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-black transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  )
}
