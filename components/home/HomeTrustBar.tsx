import { ShieldAlert, Scale, Newspaper, BookOpen } from "lucide-react"

const pillars = [
  {
    icon: <Scale className="w-6 h-6 text-secondary" />,
    title: "Independent Analysis",
    body: "We examine publicly available RTO data, website performance, and compliance signals — with no commercial relationships affecting our editorial judgement.",
  },
  {
    icon: <ShieldAlert className="w-6 h-6 text-secondary" />,
    title: "Consumer Protection",
    body: "We surface hidden costs, flag compliance risks, and give students the information they need to choose a safe, quality provider.",
  },
  {
    icon: <Newspaper className="w-6 h-6 text-secondary" />,
    title: "Tribune Journalism",
    body: "Investigative reporting on the vocational education sector, following Australian Press Council editorial standards with full independence.",
  },
  {
    icon: <BookOpen className="w-6 h-6 text-secondary" />,
    title: "Educational Resources",
    body: "State-by-state licensing guides, career pathways, cost breakdowns, and tools for planning your CPP41419 and related qualifications.",
  },
]

export default function HomeTrustBar() {
  return (
    <section className="bg-background py-20 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-secondary text-xs font-bold uppercase tracking-widest mb-3">
            <span className="w-8 h-px bg-secondary" />
            What We Do
            <span className="w-8 h-px bg-secondary" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">
            Built for Transparency. Trusted by Students.
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            CPP41419.com.au is not a training provider. We are an independent analysis platform
            dedicated to protecting Australians navigating vocational education.
          </p>
        </div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="group relative bg-card border border-border rounded-xl p-6 hover:border-secondary/40 hover:shadow-md transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/8 flex items-center justify-center mb-4 group-hover:bg-secondary/10 transition-colors">
                {p.icon}
              </div>
              <h3 className="font-bold text-foreground mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>

        {/* Legal disclaimer bar */}
        <div className="mt-12 flex items-start gap-3 bg-secondary/8 border border-secondary/20 rounded-lg px-5 py-4">
          <ShieldAlert className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
          <p className="text-sm text-foreground/80 leading-relaxed">
            <strong className="text-foreground">LEGAL NOTICE:</strong> CPP41419.com.au is NOT a Registered Training Organisation (RTO). We do not deliver training, issue certificates, or process enrolments.
            For actual CPP41419 training, enrol with an ASQA-registered RTO — verify at{" "}
            <a
              href="https://training.gov.au"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-secondary transition-colors"
            >
              training.gov.au
            </a>.
          </p>
        </div>
      </div>
    </section>
  )
}
