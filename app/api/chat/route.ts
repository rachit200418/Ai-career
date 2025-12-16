import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import clientPromise from "@/lib/mongodb"

export async function POST(request: Request) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { message, chatHistory } = await request.json()

    const client = await clientPromise
    const db = client.db("career_counseling")

    const assessment = await db
      .collection("assessments")
      .findOne({ userId: session.userId }, { sort: { completedAt: -1 } })

    const systemPrompt = `You are an expert AI career counselor. Provide thoughtful, personalized career guidance.
${assessment ? `User's background: Interests: ${assessment.responses.interests.join(", ")}, Skills: ${assessment.responses.skills.join(", ")}` : ""}
Be empathetic, encouraging, and provide actionable advice.`

    const geminiApiKey = process.env.GEMINI_API_KEY
    if (!geminiApiKey) {
      return NextResponse.json(
        { error: "Gemini API key not configured" },
        { status: 500 }
      )
    }

    const formattedHistory = chatHistory.map((msg: any) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }))

    const aiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents: [
            ...formattedHistory,
            { role: "user", parts: [{ text: message }] },
          ],
        }),
      }
    )

    const aiData = await aiResponse.json()

    if (!aiData.candidates || !aiData.candidates[0]) {
      console.error("Gemini API error:", aiData)
      return NextResponse.json(
        { error: "Failed to get AI response" },
        { status: 500 }
      )
    }

    const assistantMessage = aiData.candidates[0].content.parts[0].text

    // ✅ FIXED MONGODB UPDATE (uses $each)
    await db.collection("chats").updateOne(
      { userId: session.userId },
      {
        $push: {
          messages: {
            $each: [
              { role: "user", content: message, timestamp: new Date() },
              {
                role: "assistant",
                content: assistantMessage,
                timestamp: new Date(),
              },
            ],
          },
        },
        $set: { updatedAt: new Date() },
        $setOnInsert: { createdAt: new Date() },
      },
      { upsert: true }
    )

    return NextResponse.json({
      success: true,
      message: assistantMessage,
    })
  } catch (error) {
    console.error("Chat error:", error)
    return NextResponse.json(
      { error: "Failed to process message" },
      { status: 500 }
    )
  }
}
