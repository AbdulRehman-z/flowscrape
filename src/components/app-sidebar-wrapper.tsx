import { auth } from "@/auth"
import { AppSidebar } from "./app-sidebar"

export async function AppSidebarWrapper() {
  const session = await auth()

  if (!session?.user?.name && !session?.user?.email && !session?.user?.image) {
    return null
  }

  return <AppSidebar user={{
    name: session.user.name || '',
    email: session.user.email || '',
    avatar: session.user.image || ''
  }} />
}
