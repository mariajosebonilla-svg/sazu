import Link from 'next/link'
import Image from 'next/image'

// Social icons as inline SVGs — gray tone, no color branding
function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Instagram">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="LinkedIn">
      <rect x="2" y="2" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M7 10v7M7 7v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M11 17v-4c0-1.5 1-2.5 2.5-2.5S16 11.5 16 13v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M11 10v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function YouTubeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="YouTube">
      <rect x="2" y="4" width="20" height="16" rx="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M10 9.5l5 2.5-5 2.5V9.5z" fill="currentColor"/>
    </svg>
  )
}

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer id="contacto" className="bg-sazu-void border-t border-sazu-border">
      {/* Contact block */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 border border-sazu-border">

          <div className="p-10 md:p-14 border-b md:border-b-0 md:border-r border-sazu-border">
            <span className="text-label uppercase tracking-widest text-sazu-ghost block mb-5">
              Escríbenos
            </span>
            <a
              href="mailto:mariana@sazulab.com"
              className="font-display text-sazu-white hover:text-sazu-purple transition-colors duration-300 block"
              style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)', fontStyle: 'italic', fontWeight: 300 }}
            >
              mariana@sazulab.com
            </a>
          </div>

          <div className="p-10 md:p-14 border-b md:border-b-0 md:border-r border-sazu-border">
            <span className="text-label uppercase tracking-widest text-sazu-ghost block mb-5">
              Contáctanos
            </span>
            <a
              href="tel:+573006568714"
              className="font-display text-sazu-white hover:text-sazu-purple transition-colors duration-300 block mb-2"
              style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)', fontStyle: 'italic', fontWeight: 300 }}
            >
              +57 300 656 8714
            </a>
            <span className="text-body-sm text-sazu-ghost">
              Cra 10 # 96 - 79, Bogotá
            </span>
          </div>

          <div className="p-10 md:p-14">
            <span className="text-label uppercase tracking-widest text-sazu-ghost block mb-5">
              Síguenos
            </span>
            <div className="flex gap-5 items-center">
              <a
                href="https://www.instagram.com/sazu_lab/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sazu-ghost hover:text-sazu-white transition-colors duration-300"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://www.linkedin.com/company/sazu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sazu-ghost hover:text-sazu-white transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>
              <a
                href="https://www.youtube.com/@sazulab"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sazu-ghost hover:text-sazu-white transition-colors duration-300"
                aria-label="YouTube"
              >
                <YouTubeIcon />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-sazu-border">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <Link href="/">
            <Image src="/logo.svg" alt="Sazú" width={72} height={27} />
          </Link>
          <span className="text-label text-sazu-ghost">
            © {year} Sazú. Todos los derechos reservados.
          </span>
        </div>
      </div>
    </footer>
  )
}
