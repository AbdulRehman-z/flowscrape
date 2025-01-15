import { getCredentialsAction } from "@/actions/credential/get-credentials-action";
import CreateCredentialDialog from "@/components/credential/create-credential-dialog";
import { DeleteCredentialDialog } from "@/components/credential/delete-credential-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";
import { AlertCircle, LockIcon, ShieldIcon, ShieldOff } from "lucide-react";
import { Suspense } from "react";

export default function Page() {
  return (
    <section className="flex flex-1 h-full flex-col section-padding">
      <div className="flex  justify-between" >
        <div className="flex flex-col justify-start space-y- ">
          <h1 className="text-3xl font-bold">Credentials</h1>
          <p className=" text-muted-foreground">
            Manage your credentials here.
          </p>
        </div>
        <CreateCredentialDialog triggerText="Create credential" />
      </div >

      <div className="h-full space-y-6 pt-6">
        <Alert>
          <div className="flex flex-col">
            <div className="flex gap-x-1">
              <ShieldIcon className="size-5 mt-[1px] stroke-green-400" />
              <AlertTitle className="text-green-400 text-base font-semibold">
                Encryption
              </AlertTitle>
            </div>
            <AlertDescription className="ml-6 text-muted-foreground">
              All information is securely encrypted, ensuring your data remains safe.
            </AlertDescription>
          </div>
        </Alert>

        <div className="h-full">
          <Suspense fallback={<Skeleton className="w-full h-72" />}>
            <UserCredentials />
          </Suspense>
        </div>
      </div>
    </section >
  )
}


async function UserCredentials() {
  const credentials = await getCredentialsAction()


  if (!credentials) {
    <div className="container mx-auto px-4 py-8">
      <Alert variant="destructive" className="mb-4">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center">
            <AlertCircle className="size-5" />
            <AlertTitle className="ml-2 text-lg font-bold">Something went wrong</AlertTitle>
          </div>
          <AlertDescription className="text-base leading-relaxed my-2">
            <p>
              The workflows you&apos;re looking for could not be found. It may have been deleted or you might not have permission to access it.
            </p>
          </AlertDescription>
        </div>
      </Alert>
    </div>
  }

  if (credentials.length === 0) {
    return <Card className="w-full p-6 shadow-none">
      <div className="flex justify-between items-center flex-col gap-y-4">
        <div className="size-24 rounded-full flex justify-center items-center bg-accent">
          <ShieldOff className="size-14 stroke-green-400" />
        </div>

        <div className="flex flex-col items-center justify-center">
          <p className="font-semibold text-base">No credentials created yet</p>
          <p className="text-muted-foreground text-sm">Click the button below to create your first credential</p>
          <div className="mt-3">
            <CreateCredentialDialog triggerText="Create your first credential" />
          </div>
        </div>
      </div>
    </Card>
  }


  return (
    <div className="flex flex-col gap-y-4">
      {credentials.map((credential) => {
        const created = formatDistanceToNow(credential.createdAt, {
          addSuffix: true
        })

        return (
          <Card key={credential.id} className="px-4 py-7 shadow-none">
            <div className="flex items-center justify-between">
              {/* left  */}
              <div className="flex items-center gap-x-3">
                <div className="size-10 rounded-full flex justify-center items-center bg-green-400/15">
                  <LockIcon className="stroke-green-400 size-6" />
                </div>
                <div className=" flex flex-col">
                  <p>{credential.name}</p>
                  <p className="text-sm text-muted-foreground">{created}</p>
                </div>
              </div>
              {/* right */}
              <DeleteCredentialDialog credentialName={credential.name!} />
            </div>
          </Card>
        )
      })}
    </div>
  )

}
