import { Workflow, EditIcon, CreditCard, LayoutDashboard, Key } from 'lucide-react'


export const navItems = [
  { title: "Dashboard", icon: LayoutDashboard, url: "/dashboard" },
  {
    title: "Workflows", icon: Workflow, url: "/workflows",
    subRoutes: [
      {
        title: "Editor",
        url: "/workflows/editor",
        icon: EditIcon
      },
    ],
  },
  { title: "Credentials", icon: Key, url: "/credentials" },
  { title: "Billings", icon: CreditCard, url: "/billings" },
]
