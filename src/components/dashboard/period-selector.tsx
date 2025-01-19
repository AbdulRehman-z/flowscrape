"use client";

import { Period } from "@/types/dashboard-types";
import { useRouter, useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";


const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] as const;

type PeriodSelectorProps = {
  periods: Period[];
  selectedPeriod: Period;
};

export default function PeriodSelector({ periods, selectedPeriod }: PeriodSelectorProps) {
  const router = useRouter();
  const searchParams = useSearchParams()

  return (
    <Select
      value={`${selectedPeriod.month}-${selectedPeriod.year}`}
      onValueChange={(value) => {
        const [month, year] = value.split("-");
        const params = new URLSearchParams(searchParams);
        params.set("month", month)
        params.set("year", year);
        router.push(`?${params.toString()}`);
      }
      }>
      <SelectTrigger className="min-w-52">
        <SelectValue placeholder="Select a period" />
      </SelectTrigger>
      <SelectContent className="w-full">
        {
          periods.map((period, i) => (
            <SelectItem key={i} value={`${period.month}-${period.year}`}>
              {`${months[period.month]}-${period.year}`}
            </SelectItem>
          ))
        }
      </SelectContent>
    </Select>
  );
}
