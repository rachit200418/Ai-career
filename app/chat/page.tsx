import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import ChatInterface from "@/components/chat-interface"

export default async function ChatPage() {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="flex h-screen flex-col">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-xl font-bold">AI Career Counselor</h1>
        </div>
      </header>
      <ChatInterface />
    </div>
  )
}
