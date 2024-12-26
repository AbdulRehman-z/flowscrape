import { Log, LogFunction, LogLevel, LogLevels } from "@/types/log.types";

export function createLogCollector() {
  const logs: Log[] = []
  const getAll = () => logs

  const logFunctions = {} as Record<LogLevel, LogFunction>
  LogLevels.forEach((level) => (logFunctions[level] = (message: string) => {
    logs.push({ message, level, timestamp: new Date() })
  }))

  return {
    ...logFunctions,
    getAll
  }

}
