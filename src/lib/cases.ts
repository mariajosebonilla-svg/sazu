import fs from 'fs'
import path from 'path'
import { CaseStudy } from '@/types'

const CASES_DIR = path.join(process.cwd(), 'content/casos')

// ── Load all cases ────────────────────────────────────────────────
export function getAllCases(): CaseStudy[] {
  const files = fs.readdirSync(CASES_DIR).filter(f => f.endsWith('.json'))

  const cases = files.map(file => {
    const raw = fs.readFileSync(path.join(CASES_DIR, file), 'utf-8')
    return JSON.parse(raw) as CaseStudy
  })

  return cases
    .sort((a, b) => a.order - b.order)
}

// ── Load single case ──────────────────────────────────────────────
export function getCaseBySlug(slug: string): CaseStudy | null {
  const filePath = path.join(CASES_DIR, `${slug}.json`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const caseData = JSON.parse(raw) as CaseStudy

  // Auto-inject next/prev navigation
  const allCases = getAllCases()
  const index = allCases.findIndex(c => c.slug === slug)
  if (index !== -1) {
    caseData.nextCase = allCases[(index + 1) % allCases.length]?.slug
    caseData.prevCase = allCases[(index - 1 + allCases.length) % allCases.length]?.slug
  }

  return caseData
}

// ── Load featured cases ───────────────────────────────────────────
export function getFeaturedCases(limit = 3): CaseStudy[] {
  return getAllCases()
    .filter(c => c.featured)
    .slice(0, limit)
}

// ── Get all slugs (for generateStaticParams) ──────────────────────
export function getAllCaseSlugs(): string[] {
  return fs
    .readdirSync(CASES_DIR)
    .filter(f => f.endsWith('.json'))
    .map(f => f.replace('.json', ''))
}
