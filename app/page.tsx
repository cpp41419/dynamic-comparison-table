import HomeNav from "@/components/home/HomeNav"
import HomeHero from "@/components/home/HomeHero"
import HomeTrustBar from "@/components/home/HomeTrustBar"
import CourseSelection from "@/components/course-selection"
import SiteFooter from "@/components/home/SiteFooter"

export default function Home() {
  return (
    <>
      <HomeNav />
      <main>
        <HomeHero />
        <HomeTrustBar />
        <section id="courses" className="scroll-mt-16">
          <div className="bg-background pt-4 pb-2 border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1 h-6 bg-secondary rounded-full" />
                <h2 className="text-2xl font-bold text-foreground">Course Comparison Engine</h2>
              </div>
              <p className="text-muted-foreground ml-4 text-sm">
                Select a qualification below to compare RTOs, analyse risk profiles, and surface true market pricing.
              </p>
            </div>
          </div>
          <CourseSelection />
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
