import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { intervalToDuration } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Converts a time duration between two dates into a human-readable string format
 * @param end - The end date
 * @param start - The start date
 * @returns A string representing the duration in minutes and seconds, or milliseconds if < 1 second
 */
export function DatesToDurationString(end: Date | null | undefined, start: Date | null | undefined) {
  // Return null if either date is missing
  if (!end || !start) {
    return null
  }

  // Calculate milliseconds between dates
  const timeElapsed = end.getTime() - start.getTime()

  // If less than 1 second, return milliseconds
  if (timeElapsed < 1000) {
    return `${timeElapsed}ms`
  }

  // Convert milliseconds into duration object with minutes/seconds
  const duration = intervalToDuration({
    start: 0,
    end: timeElapsed
  })

  // Format duration as "Xm Ys" string with 0 as default
  return `${duration.minutes || 0}m ${duration.seconds || 0}s`
}
