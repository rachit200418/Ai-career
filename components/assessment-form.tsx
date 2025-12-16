"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

const interestOptions = [
  "Technology",
  "Business",
  "Creative Arts",
  "Healthcare",
  "Education",
  "Science",
  "Engineering",
  "Social Services",
  "Finance",
  "Marketing",
]

const skillOptions = [
  "Programming",
  "Communication",
  "Leadership",
  "Problem Solving",
  "Creativity",
  "Analytical Thinking",
  "Project Management",
  "Teamwork",
  "Writing",
  "Design",
]

export default function AssessmentForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    interests: [] as string[],
    skills: [] as string[],
    education: "",
    experience: "",
    goals: "",
    workStyle: "",
  })

  const toggleInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }))
  }

  const toggleSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill) ? prev.skills.filter((s) => s !== skill) : [...prev.skills, skill],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Submit assessment
      const assessmentRes = await fetch("/api/assessment/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const assessmentData = await assessmentRes.json()

      if (assessmentRes.ok) {
        // Generate recommendations
        const recommendRes = await fetch("/api/recommendations/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ assessmentId: assessmentData.assessmentId }),
        })

        if (recommendRes.ok) {
          router.push("/recommendations")
        }
      }
    } catch (error) {
      console.error("Error submitting assessment:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Interests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            {interestOptions.map((interest) => (
              <div key={interest} className="flex items-center space-x-2">
                <Checkbox
                  id={interest}
                  checked={formData.interests.includes(interest)}
                  onCheckedChange={() => toggleInterest(interest)}
                />
                <Label htmlFor={interest} className="cursor-pointer">
                  {interest}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            {skillOptions.map((skill) => (
              <div key={skill} className="flex items-center space-x-2">
                <Checkbox
                  id={skill}
                  checked={formData.skills.includes(skill)}
                  onCheckedChange={() => toggleSkill(skill)}
                />
                <Label htmlFor={skill} className="cursor-pointer">
                  {skill}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Education Level</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="e.g., Bachelor's in Computer Science"
            value={formData.education}
            onChange={(e) => setFormData({ ...formData, education: e.target.value })}
            required
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Work Experience</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Describe your relevant work experience..."
            value={formData.experience}
            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            rows={4}
            required
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Career Goals</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="What are your career aspirations and goals?"
            value={formData.goals}
            onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
            rows={4}
            required
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Work Style Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Describe your preferred work environment and style..."
            value={formData.workStyle}
            onChange={(e) => setFormData({ ...formData, workStyle: e.target.value })}
            rows={4}
            required
          />
        </CardContent>
      </Card>

      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? "Generating Recommendations..." : "Complete Assessment"}
      </Button>
    </form>
  )
}
