'use client'

import Image from 'next/image'
import { Reveal } from '@/components/animations/Reveal'
import { TextReveal } from '@/components/animations/TextReveal'
import { CaseStudy, GalleryItem } from '@/types'

// ── Helpers ──────────────────────────────────────────────────────
function getYouTubeId(url: string): string | null {
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/)
  return m ? m[1] : null
}

function isVideoUrl(src: string): boolean {
  return (
    src.includes('youtube.com') ||
    src.includes('youtu.be') ||
    src.includes('vimeo.com') ||
    src.endsWith('.mp4') ||
    src.endsWith('.webm')
  )
}

function getVimeoId(url: string): string | null {
  const m = url.match(/vimeo\.com\/(\d+)/)
  return m ? m[1] : null
}

// ── Gallery Item renderer ─────────────────────────────────────────
function GalleryMediaItem({ item }: { item: GalleryItem }) {
  const src = item.src

  // YouTube
  const ytId = getYouTubeId(src)
  if (ytId) {
    return (
      <div className="relative bg-sazu-surface overflow-hidden w-full h-full">
        <div className="video-embed">
          <iframe
            src={`https://www.youtube.com/embed/${ytId}?rel=0&modestbranding=1`}
            title={item.alt ?? 'Video'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        {item.caption && (
          <div className="p-4">
            <span className="text-label text-sazu-ghost">{item.caption}</span>
          </div>
        )}
      </div>
    )
  }

  // Vimeo
  const vimeoId = getVimeoId(src)
  if (vimeoId) {
    return (
      <div className="relative bg-sazu-surface overflow-hidden w-full h-full">
        <div className="video-embed">
          <iframe
            src={`https://player.vimeo.com/video/${vimeoId}?byline=0&portrait=0`}
            title={item.alt ?? 'Video'}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
        {item.caption && (
          <div className="p-4">
            <span className="text-label text-sazu-ghost">{item.caption}</span>
          </div>
        )}
      </div>
    )
  }

  // HTML5 video (.mp4 / .webm)
  if (src.endsWith('.mp4') || src.endsWith('.webm')) {
    return (
      <div className="relative bg-sazu-surface overflow-hidden w-full h-full">
        <div className="video-embed">
          <video controls preload="metadata">
            <source src={src} />
          </video>
        </div>
        {item.caption && (
          <div className="p-4">
            <span className="text-label text-sazu-ghost">{item.caption}</span>
          </div>
        )}
      </div>
    )
  }

  // Default: image
  return (
    <div className="relative bg-sazu-surface overflow-hidden aspect-case">
      <Image
        src={src}
        alt={item.alt ?? ''}
        fill
        className="object-cover hover:scale-105 transition-transform duration-700"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      {item.caption && (
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-sazu-black/80 to-transparent">
          <span className="text-label text-sazu-off-white">{item.caption}</span>
        </div>
      )}
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────
export function CaseContent({ caseData }: { caseData: CaseStudy }) {
  return (
    <article className="bg-sazu-black">

      {/* ── Context + Challenge ────────────────────────── */}
      <section className="max-w-screen-xl mx-auto px-6 md:px-10 py-28 md:py-40">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="md:col-span-4">
            <Reveal>
              <span className="accent-line mb-4" />
              <span className="text-label uppercase tracking-widest text-sazu-ghost block">
                Contexto
              </span>
            </Reveal>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <Reveal delay={0.1}>
              <p className="text-body-lg text-sazu-off-white leading-relaxed">
                {caseData.context}
              </p>
            </Reveal>
          </div>
        </div>

        {/* Divider */}
        <div className="divider my-20" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <div>
            <Reveal>
              <span className="accent-line mb-4" />
              <span className="text-label uppercase tracking-widest text-sazu-ghost block mb-6">
                El reto
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-body-lg text-sazu-off-white leading-relaxed">
                {caseData.challenge}
              </p>
            </Reveal>
          </div>
          <div>
            <Reveal delay={0.15}>
              <span className="accent-line mb-4" />
              <span className="text-label uppercase tracking-widest text-sazu-ghost block mb-6">
                La solución
              </span>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="text-body-lg text-sazu-off-white leading-relaxed">
                {caseData.solution}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Process ───────────────────────────────────── */}
      {caseData.process?.length > 0 && (
        <section className="border-y border-sazu-border py-28 md:py-40">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10">
            <Reveal>
              <span className="text-label uppercase tracking-widest text-sazu-ghost block mb-16">
                Proceso
              </span>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-sazu-border">
              {caseData.process.map((step, i) => (
                <Reveal key={step.phase} delay={i * 0.08} variant="fadeIn">
                  <div className="bg-sazu-surface p-10 h-full">
                    <span className="font-display text-6xl text-sazu-border block mb-6" style={{ fontStyle: 'italic' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h4 className="text-body-md font-medium text-sazu-white mb-3">
                      {step.phase}
                    </h4>
                    <p className="text-body-sm text-sazu-ghost leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Results ───────────────────────────────────── */}
      {caseData.results?.length > 0 && (
        <section className="py-28 md:py-40 bg-sazu-void">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10">
            <Reveal>
              <TextReveal
                text="Resultados."
                className="font-display text-display-xl text-sazu-white mb-20"
                tag="h3"
              />
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-sazu-border">
              {caseData.results.map((r, i) => (
                <Reveal key={r.label} delay={i * 0.1} variant="fadeIn">
                  <div className="bg-sazu-void p-12 text-center border border-sazu-border">
                    <span className="font-display text-display-xl text-sazu-purple block mb-3">
                      {r.metric}
                    </span>
                    <span className="text-body-md text-sazu-white font-medium block mb-2">
                      {r.label}
                    </span>
                    {r.description && (
                      <span className="text-body-sm text-sazu-ghost">
                        {r.description}
                      </span>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Gallery (images + videos) ─────────────────── */}
      {caseData.gallery?.length > 0 && (
        <section className="py-16">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10 mb-10">
            <Reveal>
              <span className="text-label uppercase tracking-widest text-sazu-ghost">
                Galería
              </span>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-sazu-border">
            {caseData.gallery.map((item, i) => {
              const isHalf = item.size === 'half'
              const isFull = item.size === 'full'
              const isVideo = isVideoUrl(item.src) || item.type === 'video'
              return (
                <Reveal
                  key={item.src + i}
                  delay={i * 0.05}
                  variant="fadeIn"
                  className={
                    isFull
                      ? 'col-span-full'
                      : isHalf
                      ? 'md:col-span-2'
                      : isVideo
                      ? 'col-span-full md:col-span-2'
                      : 'col-span-1'
                  }
                >
                  <GalleryMediaItem item={item} />
                </Reveal>
              )
            })}
          </div>
        </section>
      )}

      {/* ── Closing Paragraph ─────────────────────────── */}
      {caseData.closingParagraph && (
        <section className="py-32 md:py-44 bg-sazu-black">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10">
            <Reveal variant="fadeIn">
              <p
                className="font-display text-sazu-white text-center mx-auto leading-tight"
                style={{
                  fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
                  fontWeight: 400,
                  maxWidth: '48rem',
                  lineHeight: 1.4,
                }}
              >
                {caseData.closingParagraph}
              </p>
            </Reveal>
          </div>
        </section>
      )}
    </article>
  )
}
