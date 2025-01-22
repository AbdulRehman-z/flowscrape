import { getCreditsPurchasesAction } from "@/actions/billing/get-credits-prchases-action"
import { getUserBalanceAction } from "@/actions/billing/get-user-balance-action"
import { getCreditsUsageStatsAction } from "@/actions/dashboard/get-credits-stats"
import CreditsPurchase from "@/components/billing/credits-card"
import InvoiceBtn from "@/components/billing/invoice-btn"
import { CreditsStatusChart } from "@/components/dashboard/credits-chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import ReactCountUpWrapper from "@/components/workflow/react-countup-wrapper"
import { Period } from "@/types/dashboard-types"
import { ArrowLeftRightIcon, CoinsIcon } from "lucide-react"
import { Suspense } from "react"

export default function Page() {
  return (
    <section className="flex flex-1 flex-col gap-y-7   section-padding">
      <div className="">
        <h1 className="font-bold text-3xl">Billings</h1>
      </div>
      <div className="flex flex-col gap-y-10">
        <Suspense fallback={<CardSkeleton type="card" />}>
          <BalanceCard />
        </Suspense>
        <Suspense fallback={<CardSkeleton type="pricing" />}>
          <CreditsConsumedCurrentMonth />
        </Suspense>
        <Suspense fallback={<CardSkeleton type="pricing" />}>
          <CreditsPurchaseHistory />
        </Suspense>
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

function CardSkeleton({ type }: BalanceCardSkeletonProps) {
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

async function CreditsConsumedCurrentMonth() {
  const period: Period = {
    month: new Date().getMonth(),
    year: new Date().getFullYear()
  }
  const creditUsage = await getCreditsUsageStatsAction(period)

  return (
    <CreditsStatusChart data={creditUsage} description="Daily credit consumed in the current month" title="Credits consumed" />
  )
}


async function CreditsPurchaseHistory() {
  const purchases = await getCreditsPurchasesAction()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <ArrowLeftRightIcon className="size-6 text-primary" />
          Transaction History
        </CardTitle>
        <CardDescription>
          View your transaction history and download invoices
        </CardDescription>
      </ CardHeader>
      <CardContent className="space-y-4">
        {purchases.length === 0 && (
          <p className=" text-muted-foreground">
            No transactions found
          </p>
        )}
        {
          purchases.map((purchase) => (
            <div key={purchase.id} className="flex justify-between items-center border-b last:border-none">
              <div>
                <p className="font-medium">
                  {formatDate(purchase.date)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {purchase.description}
                </p>
              </div>

              <div className="text-right">
                <p className="font-medium">
                  {formatAmount(purchase.amount, purchase.currency)}
                </p>
                <InvoiceBtn purchaseId={purchase.id} />
              </div>
            </div>
          ))
        }
      </CardContent>
    </Card>
  )
}

function formatDate(date: Date) {
  return Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(date)
}

function formatAmount(amount: number, currency: string) {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2
  }).format(amount / 100)
}
