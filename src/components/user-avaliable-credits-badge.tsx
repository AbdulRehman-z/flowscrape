import { useGetAvaliableCredits } from "@/hooks/credits/use-get-credits"
import { CoinsIcon, Loader2Icon } from "lucide-react"
import Link from "next/link"
import { SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar"
import ReactCountUpWrapper from "./workflow/react-countup-wrapper"


export default function UserAvaliableCreditsBadge() {

  const { avaliableCredits, isLoadingCredits } = useGetAvaliableCredits()
  return <SidebarMenuItem className="flex mx-auto w-full" >
    < SidebarMenuButton
      asChild
      className="py-5 border-2"
      tooltip={"Total credits"}
    >
      <Link href={" /billings"} className="flex w-full h-full items-center gap-2 justify-center">
        {isLoadingCredits ? <Loader2Icon size={20} className="animate-spin" /> : <>
          <CoinsIcon size={20} className="stroke-green-500" />
          <ReactCountUpWrapper value={avaliableCredits!} />
        </>}
      </Link>
    </SidebarMenuButton >
  </SidebarMenuItem >
}
