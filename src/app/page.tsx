import Hero from '@/components/home/Hero'
import TrendingNow from '@/components/home/TrendingNow'

export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <div className="bg-white pb-6 sm:pb-8 lg:pb-12">
      <Hero />
      <TrendingNow />
    </div>
  )
}
