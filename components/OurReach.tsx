import { useEffect, useState } from "react"
// import mapImage from "figma:asset/4129531b54ca28454989b0bd4a5721d9e6b42769.png"

// Counter component for animated numbers
function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000 // 2 seconds
    const increment = end / (duration / 50)
    
    const timer = setInterval(() => {
      setCount((prev) => {
        const next = prev + increment
        if (next >= end) {
          clearInterval(timer)
          return end
        }
        return next
      })
    }, 50)

    return () => clearInterval(timer)
  }, [end])

  return (
    <span>{Math.floor(count)}{suffix}</span>
  )
}

const reachStats = [
  {
    number: 31,
    suffix: "",
    label: "SOS Children's Villages"
  },
  {
    number: 27,
    suffix: "",
    label: "Family Strengthening Projects"
  },
  {
    number: 10000,
    suffix: "+",
    label: "Families strengthened via capacity building activities"
  },
  {
    number: 15000,
    suffix: "+",
    label: "Vulnerable women integrated into Self Help Groups"
  },
  {
    number: 11,
    suffix: "",
    label: "Kinship Care Projects"
  },
  {
    number: 10,
    suffix: "",
    label: "Vocational Training Centres"
  }
]

export function OurReach() {
  // Temporarily disabled per user request. Returning null ensures nothing renders.
  return null
}