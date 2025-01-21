import { AppNodeType } from "@/types/app-node-types";
import { TaskREgistery } from "./task/task-registery";
import { env } from "@/schemas/env-schema";
import { timingSafeEqual } from "crypto";
import { Period } from "@/types/dashboard-types";
import { endOfMonth, startOfMonth } from "date-fns";
import { CreditsPack } from "@/types/pricing-types";
/**
 * Calculates the total credit cost of a workflow by summing up the credit costs of all nodes.
 * @param nodes Array of workflow nodes to calculate costs for
 * @returns Total credit cost of the workflow
 */
export const CalculateWorkflowCost = (nodes: AppNodeType[]) => {
  return nodes.reduce((acc, node) => TaskREgistery[node.data.type].credits + acc, 0
  );
};


/**
*  Returns the full url of the app.
* @param path relative path e.g. api/workflows/execute/1
* @returns full url e.g. https://app.example.com/api/workflows/execute/1
*/
export const getAppUrl = (path: string) => {
  return `${env.NEXT_PUBLIC_URL}/${path}`;
}


/**
 * Checks if the token is valid.
 * @param token Token to check
 * @returns true if the token is valid, false otherwise
 */
export const isValidToken = (token: string) => {
  try {
    return timingSafeEqual(Buffer.from(token), Buffer.from(env.API_SECRET))
  } catch {
    return false;
  }
}


export const PeriodToDateRange = (period: Period) => {
  const startDate = startOfMonth(new Date(period.year, period.month))
  const endDate = endOfMonth(new Date(period.year, period.month))

  return {
    startDate,
    endDate
  }
}


export const GetSelectedCreditPack = (packId: string) => {
  return CreditsPack.find((pack) => pack.id === packId)
}
