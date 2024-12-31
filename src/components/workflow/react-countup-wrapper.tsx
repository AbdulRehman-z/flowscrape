import ReactCountUp from "react-countup"
import { useState, useEffect } from "react"

type ReactCountUpWrapperProps = {
  value: number
}

export default function ReactCountUpWrapper({ value }: ReactCountUpWrapperProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <p>-1</p>
  }

  return <ReactCountUp className="font-semibold" start={0} end={value} duration={1} separator="," decimals={0} />
}
