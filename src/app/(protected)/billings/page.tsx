import { getUserBalanceAction } from "@/actions/billing/get-user-balance-action"
import CreditsPurchase from "@/components/billing/credits-card"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import ReactCountUpWrapper from "@/components/workflow/react-countup-wrapper"
import { CoinsIcon } from "lucide-react"
import { Suspense } from "react"

export default function Page() {
  return (
    <section className="flex flex-1 flex-col gap-y-7   section-padding">
      <div className="">
        <h1 className="font-bold text-3xl">Billings</h1>
      </div>
      <div className="flex flex-col gap-y-10">
        <Suspense fallback={<BalanceCardSkeleton type="card" />}>
          <BalanceCard />
        </Suspense>
        <CreditsPurchase />
      </div>
    </section>
  )
}

async function BalanceCard() {
  const userBalance = await getUserBalanceAction()

  return (
    <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20 shadow-lg flex justify-between flex-col overflow-hidden">
      <CardContent className="p-6 relative items-center">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-y-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-1">
                Available Credits
              </h3>
              <span className="text-4xl font-bold">
                <ReactCountUpWrapper value={userBalance} />
              </span>
              <CoinsIcon className="size-36 absolute right-0 stroke-primary/20 -top-7 left-99" />
            </div>
            <p className="text-sm text-muted-foreground">
              When your credit balance reaches zero, you will no longer be able
              to run any workflows.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

type BalanceCardSkeletonProps = {
  type?: "card" | "pricing"
}

function BalanceCardSkeleton({ type }: BalanceCardSkeletonProps) {
  return (
    <div className="grid grid-cols-1 gap-y-7 md:grid-cols-2 lg:grid-cols-3 gap-x-5">
      {type === "card" ? (
        <Skeleton className="h-1/3 w-full" />
      ) : (
        Array.from({ length: 3 }, (_, i) => (
          <Skeleton key={i} className="h-32 w-72" />
        ))
      )}
    </div>
  )
}
