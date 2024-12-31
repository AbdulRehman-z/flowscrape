import { Workflow, EditIcon, CreditCard, LayoutDashboard, Key, Play } from 'lucide-react'


export const navItems = [
  { title: "Dashboard", icon: LayoutDashboard, url: "/dashboard" },
  {
    title: "Workflows", icon: Workflow, url: "/workflows",
    subRoutes: [
      {
        title: "Editor",
        url: "/workflows/editor/",
        icon: EditIcon
      },
      {
        title: "Executor",
        url: "/workflows/executions/",
        icon: Play
      },
    ],
  },
  { title: "Credentials", icon: Key, url: "/credentials" },
  { title: "Billings", icon: CreditCard, url: "/billings" },
]
