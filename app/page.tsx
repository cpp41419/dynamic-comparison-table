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
        <section id="courses" className="scroll-mt-16 bg-background">
          {/* Section header */}
          <div className="border-b border-border bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <div className="flex items-center gap-2 text-secondary text-[10px] font-bold uppercase tracking-[0.18em] mb-3">
                <span className="w-6 h-px bg-secondary" aria-hidden="true" />
                Comparison Engine
              </div>
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance leading-tight">
                    Compare RTOs — Side by Side
                  </h2>
                  <p className="text-muted-foreground text-sm mt-2 max-w-xl text-pretty leading-relaxed">
                    Select a qualification to compare providers on pricing, compliance history, risk profile, and delivery mode. Independent data — no affiliate commissions.
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0 text-xs text-muted-foreground border border-border rounded-lg px-3.5 py-2.5 bg-card">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                  Live market data
                </div>
              </div>
            </div>
          </div>
          <CourseSelection />
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
