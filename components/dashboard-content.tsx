"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ClipboardList, MessageSquare, TrendingUp, LogOut } from "lucide-react"

export default function DashboardContent() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/")
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-border">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <h1 className="text-xl font-bold">Career Counseling Dashboard</h1>
          <Button variant="ghost" onClick={handleLogout} disabled={loading}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="mb-2 text-3xl font-bold">Welcome to Your Dashboard</h2>
          <p className="text-muted-foreground">Choose an option below to start your career discovery journey</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="transition-all hover:border-primary">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <ClipboardList className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Career Assessment</CardTitle>
              <CardDescription>
                Take our comprehensive assessment to discover careers that match your profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/assessment">Start Assessment</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="transition-all hover:border-accent">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                <MessageSquare className="h-6 w-6 text-accent" />
              </div>
              <CardTitle>AI Career Chat</CardTitle>
              <CardDescription>Chat with our AI counselor for personalized career guidance and answers</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/chat">Start Chat</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="transition-all hover:border-primary">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>My Recommendations</CardTitle>
              <CardDescription>View your personalized career recommendations and insights</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/recommendations">View Results</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
