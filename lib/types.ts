export interface User {
  _id?: string
  email: string
  name: string
  password: string
  createdAt: Date
}

export interface Assessment {
  _id?: string
  userId: string
  responses: {
    interests: string[]
    skills: string[]
    education: string
    experience: string
    goals: string
    workStyle: string
  }
  completedAt: Date
}

export interface CareerRecommendation {
  _id?: string
  userId: string
  assessmentId: string
  recommendations: {
    career: string
    matchScore: number
    description: string
    requiredSkills: string[]
    salaryRange: string
    growthOutlook: string
  }[]
  generatedAt: Date
}

export interface ChatMessage {
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export interface ChatSession {
  _id?: string
  userId: string
  messages: ChatMessage[]
  createdAt: Date
  updatedAt: Date
}
