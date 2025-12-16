import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, Target, MessageSquare, TrendingUp } from "lucide-react"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container relative mx-auto px-4 py-24 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2 text-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">AI-Powered Career Guidance</span>
            </div>
            <h1 className="mb-6 text-balance text-5xl font-bold tracking-tight md:text-7xl">
              Discover Your Perfect Career Path
            </h1>
            <p className="mb-8 text-balance text-lg text-muted-foreground md:text-xl">
              Get personalized career recommendations powered by advanced AI. Take our comprehensive assessment and
              unlock insights tailored to your unique skills, interests, and goals.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="min-w-[200px]">
                <Link href="/register">Start Your Journey</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="min-w-[200px] bg-transparent">
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-border py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Personalized Assessment</h3>
              <p className="text-muted-foreground">
                Complete our comprehensive career assessment designed to understand your unique strengths and
                aspirations.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                <Sparkles className="h-8 w-8 text-accent" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">AI-Powered Insights</h3>
              <p className="text-muted-foreground">
                Our advanced AI analyzes your profile to generate tailored career recommendations with detailed
                insights.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">24/7 AI Counselor</h3>
              <p className="text-muted-foreground">
                Chat with our AI career counselor anytime to get guidance, ask questions, and explore opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="flex flex-col items-center border-l border-border pl-6">
              <div className="mb-2 text-4xl font-bold text-primary">10K+</div>
              <div className="text-sm text-muted-foreground">Career Assessments</div>
            </div>
            <div className="flex flex-col items-center border-l border-border pl-6">
              <div className="mb-2 text-4xl font-bold text-primary">95%</div>
              <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
            </div>
            <div className="flex flex-col items-center border-l border-border pl-6">
              <div className="mb-2 text-4xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Career Paths</div>
            </div>
            <div className="flex flex-col items-center border-l border-border pl-6">
              <div className="mb-2 flex items-center gap-2 text-4xl font-bold text-primary">
                <TrendingUp className="h-8 w-8" />
                <span>24/7</span>
              </div>
              <div className="text-sm text-muted-foreground">AI Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}