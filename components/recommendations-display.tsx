"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, DollarSign, Briefcase } from "lucide-react"

interface Recommendation {
  career: string
  matchScore: number
  description: string
  requiredSkills: string[]
  salaryRange: string
  growthOutlook: string
}

export default function RecommendationsDisplay() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, fetch the latest recommendations from the database
    // For now, we'll show a placeholder message
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent" />
          <p className="text-muted-foreground">Loading your recommendations...</p>
        </div>
      </div>
    )
  }

  if (recommendations.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="mb-4 text-3xl font-bold">No Recommendations Yet</h1>
          <p className="mb-8 text-muted-foreground">
            Complete the career assessment to receive personalized career recommendations.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">Your Career Recommendations</h1>
          <p className="text-muted-foreground">
            Based on your assessment, here are the top career paths that match your profile
          </p>
        </div>

        <div className="space-y-6">
          {recommendations.map((rec, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{rec.career}</CardTitle>
                    <CardDescription className="mt-2">{rec.description}</CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-lg">
                    {rec.matchScore}% Match
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="mb-2 flex items-center gap-2 font-semibold">
                    <Briefcase className="h-4 w-4" />
                    Required Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {rec.requiredSkills.map((skill, i) => (
                      <Badge key={i} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <h4 className="mb-2 flex items-center gap-2 font-semibold">
                      <DollarSign className="h-4 w-4" />
                      Salary Range
                    </h4>
                    <p className="text-muted-foreground">{rec.salaryRange}</p>
                  </div>
                  <div>
                    <h4 className="mb-2 flex items-center gap-2 font-semibold">
                      <TrendingUp className="h-4 w-4" />
                      Growth Outlook
                    </h4>
                    <p className="text-muted-foreground">{rec.growthOutlook}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
