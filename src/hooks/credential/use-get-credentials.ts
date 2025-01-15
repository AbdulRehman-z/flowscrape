import { getCredentialsAction } from "@/actions/credential/get-credentials-action"
import { useQuery } from "@tanstack/react-query"

export const useGetCredentials = () => {
  const credentials = useQuery({
    queryKey: ["user-credentials"],
    queryFn: getCredentialsAction,
    refetchInterval: 10000
  })

  return credentials.data
}
