import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import RecommendationsDisplay from "@/components/recommendations-display"

export default async function RecommendationsPage() {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  return <RecommendationsDisplay />
}
