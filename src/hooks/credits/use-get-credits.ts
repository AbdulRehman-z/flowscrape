import { getAvaliableCredits } from "@/actions/workflow/get-avaliable-credits"
import { useQuery } from "@tanstack/react-query"

export const useGetAvaliableCredits = () => {
  const { data: avaliableCredits, isLoading: isLoadingCredits } = useQuery({
    queryKey: ["user-avaliable-credits"],
    queryFn: () => getAvaliableCredits(),
    refetchInterval: 1000 * 30 // 30 seconds
  })

  return { avaliableCredits, isLoadingCredits }
}
