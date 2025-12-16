import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import AssessmentForm from "@/components/assessment-form"

export default async function AssessmentPage() {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold">Career Assessment</h1>
            <p className="text-muted-foreground">
              Answer the following questions to help us understand your career preferences and goals
            </p>
          </div>
          <AssessmentForm />
        </div>
      </div>
    </div>
  )
}
