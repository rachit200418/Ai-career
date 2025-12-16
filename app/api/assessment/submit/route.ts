import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { getSession } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const assessmentData = await request.json()

    const client = await clientPromise
    const db = client.db("career_counseling")

    const result = await db.collection("assessments").insertOne({
      userId: session.userId,
      responses: assessmentData,
      completedAt: new Date(),
    })

    return NextResponse.json({
      success: true,
      assessmentId: result.insertedId,
    })
  } catch (error) {
    console.error("Assessment submission error:", error)
    return NextResponse.json({ error: "Failed to submit assessment" }, { status: 500 })
  }
}
