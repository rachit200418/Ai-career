import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { getSession } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { assessmentId } = await request.json()

    const client = await clientPromise
    const db = client.db("career_counseling")

    const assessment = await db.collection("assessments").findOne({
      _id: assessmentId,
      userId: session.userId,
    })

    if (!assessment) {
      return NextResponse.json({ error: "Assessment not found" }, { status: 404 })
    }

    // Call AI API to generate recommendations
    const aiResponse = await fetch("", {
      method: "POST",
      headers: {
        customerId: "[USER_CUSTOMER_ID]",
        "Content-Type": "application/json",
        Authorization: "Bearer xxx",
      },
      body: JSON.stringify({
        model: "openrouter/claude-sonnet-4",
        messages: [
          {
            role: "system",
            content: `You are an expert career counselor. Analyze the user's assessment and provide 5 personalized career recommendations. 
            Return your response as a JSON array of objects with this structure:
            [
              {
                "career": "Career Title",
                "matchScore": 95,
                "description": "Detailed description",
                "requiredSkills": ["skill1", "skill2"],
                "salaryRange": "$XX,XXX - $XXX,XXX",
                "growthOutlook": "Excellent/Good/Moderate"
              }
            ]`,
          },
          {
            role: "user",
            content: `Based on this career assessment, provide recommendations:
            Interests: ${assessment.responses.interests.join(", ")}
            Skills: ${assessment.responses.skills.join(", ")}
            Education: ${assessment.responses.education}
            Experience: ${assessment.responses.experience}
            Goals: ${assessment.responses.goals}
            Work Style: ${assessment.responses.workStyle}`,
          },
        ],
      }),
    })

    const aiData = await aiResponse.json()
    const recommendationsText = aiData.choices[0].message.content

    // Parse AI response
    let recommendations
    try {
      const jsonMatch = recommendationsText.match(/\[[\s\S]*\]/)
      recommendations = jsonMatch ? JSON.parse(jsonMatch[0]) : []
    } catch {
      recommendations = []
    }

    // Save recommendations to database
    const result = await db.collection("recommendations").insertOne({
      userId: session.userId,
      assessmentId,
      recommendations,
      generatedAt: new Date(),
    })

    return NextResponse.json({
      success: true,
      recommendationId: result.insertedId,
      recommendations,
    })
  } catch (error) {
    console.error("Recommendation generation error:", error)
    return NextResponse.json({ error: "Failed to generate recommendations" }, { status: 500 })
  }
}
