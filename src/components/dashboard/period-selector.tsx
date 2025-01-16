"use client";

import { Period } from "@/types/dashboard-types";
import { Select } from "@radix-ui/react-select";
import { useRouter, useSearchParams } from "next/navigation";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";


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
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
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
