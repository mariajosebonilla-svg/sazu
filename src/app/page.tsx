import { HeroSection } from '@/components/sections/HeroSection'
import { AgencyIntro } from '@/components/sections/AgencyIntro'
import { ClientsEcosystem } from '@/components/sections/ClientsEcosystem'
import { FeaturedCases } from '@/components/sections/FeaturedCases'
import { ProjectsGrid } from '@/components/sections/ProjectsGrid'
import { getFeaturedCases, getAllCases } from '@/lib/cases'

export default function HomePage() {
  const featured = getAllCases()
  const all = getAllCases()

  return (
    <>
      <HeroSection />
      <AgencyIntro />
      <ClientsEcosystem />
      <FeaturedCases cases={featured} />
      <ProjectsGrid cases={all} />
    </>
  )
}
