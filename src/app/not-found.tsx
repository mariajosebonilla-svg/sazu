import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-sazu-black px-10 text-center">
      <span className="font-display text-[20vw] text-sazu-border leading-none select-none">
        404
      </span>
      <h1 className="font-display text-display-lg text-sazu-white mt-6 mb-4">
        Página no encontrada
      </h1>
      <p className="text-body-md text-sazu-ghost mb-10 max-w-sm">
        La página que buscas no existe o fue movida.
      </p>
      <Link
        href="/"
        className="text-label uppercase tracking-widest text-sazu-purple border border-sazu-purple px-6 py-3 hover:bg-sazu-purple hover:text-sazu-black transition-all duration-300"
      >
        Volver al inicio →
      </Link>
    </div>
  )
}
