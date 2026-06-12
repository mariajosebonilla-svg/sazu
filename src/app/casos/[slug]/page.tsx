import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getCaseBySlug, getAllCaseSlugs, getAllCases } from '@/lib/cases'
import { CaseHero } from '@/components/sections/CaseHero'
import { CaseContent } from '@/components/sections/CaseContent'
import { CaseNavigation } from '@/components/sections/CaseNavigation'

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return getAllCaseSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getCaseBySlug(params.slug)
  if (!c) return {}
  return { title: `${c.client} — Sazú`, description: c.tagline }
}

export default function CasePage({ params }: Props) {
  const caseData = getCaseBySlug(params.slug)
  if (!caseData) notFound()

  const all = getAllCases()
  const idx = all.findIndex(c => c.slug === params.slug)
  const prevCase = all[(idx - 1 + all.length) % all.length]
  const nextCase = all[(idx + 1) % all.length]

  return (
    <>
      <CaseHero caseData={caseData} />
      <CaseContent caseData={caseData} />
      <CaseNavigation
        prevSlug={prevCase?.slug}
        prevClient={prevCase?.client}
        nextSlug={nextCase?.slug}
        nextClient={nextCase?.client}
      />
    </>
  )
}
