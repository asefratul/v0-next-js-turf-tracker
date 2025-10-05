"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Printer, GripVertical, Sprout } from "lucide-react"

interface ApplicationPeriod {
  month: string
  startWeek: number
  duration: number // how many consecutive weeks the effect lasts
  color: "blue" | "orange" | "green" | "red" | "purple"
  id: string // Add unique ID for tracking
}

interface ProgramItem {
  name: string
  applications: ApplicationPeriod[]
}

interface ProgramSection {
  title: string
  subtitle?: string
  items: ProgramItem[]
}

interface MonthInfo {
  name: string
  weeks: number
  monthNumber: number
}

interface DragState {
  itemName: string
  applicationId: string
  sectionIndex: number
  itemIndex: number
}

export default function Component() {
  // Get current year or allow it to be configurable
  const currentYear = new Date().getFullYear()

  // Function to calculate the number of weeks in a month for a given year
  // Only count weeks that have at least 4 days in the current month
  const getWeeksInMonth = (year: number, month: number): number => {
    const firstDay = new Date(year, month - 1, 1)
    const lastDay = new Date(year, month, 0)

    let weekCount = 0
    let currentDate = new Date(firstDay)

    // Start from the first day of the month
    while (currentDate <= lastDay) {
      // Find the start of the current week (Monday)
      const weekStart = new Date(currentDate)
      const dayOfWeek = weekStart.getDay()
      const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
      weekStart.setDate(weekStart.getDate() + daysToMonday)

      // Find the end of the current week (Sunday)
      const weekEnd = new Date(weekStart)
      weekEnd.setDate(weekEnd.getDate() + 6)

      // Calculate how many days of this week fall within the current month
      const weekStartInMonth = weekStart > firstDay ? weekStart : firstDay
      const weekEndInMonth = weekEnd < lastDay ? weekEnd : lastDay

      // Only count days that are actually in the current month
      if (weekStartInMonth <= weekEndInMonth) {
        const daysInMonth =
          Math.floor((weekEndInMonth.getTime() - weekStartInMonth.getTime()) / (1000 * 60 * 60 * 24)) + 1

        // Only count the week if it has at least 4 days in this month
        if (daysInMonth >= 4) {
          weekCount++
        }
      }

      // Move to the next week
      currentDate = new Date(weekEnd)
      currentDate.setDate(currentDate.getDate() + 1)
    }

    // Ensure minimum of 4 weeks and maximum of 6 weeks per month
    return Math.max(4, Math.min(6, weekCount))
  }

  // Generate months with dynamic week counts based on current year
  const months: MonthInfo[] = [
    { name: "JUL", weeks: getWeeksInMonth(currentYear, 7), monthNumber: 7 },
    { name: "AUG", weeks: getWeeksInMonth(currentYear, 8), monthNumber: 8 },
    { name: "SEP", weeks: getWeeksInMonth(currentYear, 9), monthNumber: 9 },
    { name: "OCT", weeks: getWeeksInMonth(currentYear, 10), monthNumber: 10 },
    { name: "NOV", weeks: getWeeksInMonth(currentYear, 11), monthNumber: 11 },
    { name: "DEC", weeks: getWeeksInMonth(currentYear, 12), monthNumber: 12 },
    { name: "JAN", weeks: getWeeksInMonth(currentYear + 1, 1), monthNumber: 1 },
    { name: "FEB", weeks: getWeeksInMonth(currentYear + 1, 2), monthNumber: 2 },
    { name: "MAR", weeks: getWeeksInMonth(currentYear + 1, 3), monthNumber: 3 },
    { name: "APR", weeks: getWeeksInMonth(currentYear + 1, 4), monthNumber: 4 },
    { name: "MAY", weeks: getWeeksInMonth(currentYear + 1, 5), monthNumber: 5 },
    { name: "JUN", weeks: getWeeksInMonth(currentYear + 1, 6), monthNumber: 6 },
  ]

  const seasons = [
    { name: "Winter", months: ["JUL", "AUG"] },
    { name: "Spring", months: ["SEP", "OCT", "NOV"] },
    { name: "Summer", months: ["DEC", "JAN", "FEB"] },
    { name: "Autumn", months: ["MAR", "APR", "MAY"] },
    { name: "Winter", months: ["JUN"] },
  ]

  // Helper function to get max weeks for a month (for application validation)
  const getMaxWeeksForMonth = (monthName: string): number => {
    const month = months.find((m) => m.name === monthName)
    return month ? month.weeks : 4
  }

  const validateApplication = (app: ApplicationPeriod): ApplicationPeriod => {
    const maxWeeks = getMaxWeeksForMonth(app.month)
    const adjustedStartWeek = Math.min(app.startWeek, maxWeeks)
    const maxDuration = maxWeeks - adjustedStartWeek + 1
    const adjustedDuration = Math.min(app.duration, maxDuration)

    return {
      ...app,
      startWeek: adjustedStartWeek,
      duration: adjustedDuration,
    }
  }

  // Generate unique IDs for applications
  let applicationIdCounter = 0
  const createApplicationWithId = (app: Omit<ApplicationPeriod, "id">): ApplicationPeriod => {
    return { ...app, id: `app-${applicationIdCounter++}` }
  }

  const initialProgramData: ProgramSection[] = [
    {
      title: "",
      items: [
        {
          name: "Wash In - nutrients",
          applications: (
            [
              createApplicationWithId({ month: "JUL", startWeek: 1, duration: 2, color: "blue" }),
              createApplicationWithId({ month: "AUG", startWeek: 2, duration: 2, color: "blue" }),
              createApplicationWithId({ month: "SEP", startWeek: 1, duration: 2, color: "blue" }),
              createApplicationWithId({ month: "OCT", startWeek: 2, duration: 2, color: "blue" }),
              createApplicationWithId({ month: "NOV", startWeek: 1, duration: 2, color: "blue" }),
              createApplicationWithId({ month: "DEC", startWeek: 2, duration: 2, color: "blue" }),
              createApplicationWithId({ month: "JAN", startWeek: 1, duration: 2, color: "blue" }),
              createApplicationWithId({ month: "FEB", startWeek: 2, duration: 2, color: "blue" }),
              createApplicationWithId({ month: "MAR", startWeek: 1, duration: 2, color: "blue" }),
              createApplicationWithId({ month: "APR", startWeek: 2, duration: 1, color: "blue" }),
              createApplicationWithId({ month: "MAY", startWeek: 1, duration: 2, color: "blue" }),
              createApplicationWithId({ month: "JUN", startWeek: 2, duration: 1, color: "blue" }),
            ] as ApplicationPeriod[]
          ).map(validateApplication),
        },
        {
          name: "Renovation",
          applications: (
            [createApplicationWithId({ month: "NOV", startWeek: 2, duration: 2, color: "red" })] as ApplicationPeriod[]
          ).map(validateApplication),
        },
        {
          name: "Private event",
          applications: (
            [
              createApplicationWithId({ month: "SEP", startWeek: 4, duration: 1, color: "purple" }),
            ] as ApplicationPeriod[]
          ).map(validateApplication),
        },
      ],
    },
    {
      title: "BASE - NUTRITION:",
      subtitle: "Fields: All",
      items: [
        {
          name: "MP Foundation @ 20L/Ha",
          applications: (
            [
              createApplicationWithId({ month: "JUL", startWeek: 2, duration: 1, color: "blue" }),
              createApplicationWithId({ month: "AUG", startWeek: 1, duration: 2, color: "blue" }),
              createApplicationWithId({ month: "OCT", startWeek: 3, duration: 1, color: "blue" }),
              createApplicationWithId({ month: "NOV", startWeek: 1, duration: 1, color: "blue" }),
              createApplicationWithId({ month: "JAN", startWeek: 2, duration: 2, color: "blue" }),
              createApplicationWithId({ month: "FEB", startWeek: 3, duration: 1, color: "blue" }),
              createApplicationWithId({ month: "MAR", startWeek: 1, duration: 2, color: "blue" }),
              createApplicationWithId({ month: "APR", startWeek: 2, duration: 1, color: "blue" }),
              createApplicationWithId({ month: "MAY", startWeek: 1, duration: 2, color: "blue" }),
            ] as ApplicationPeriod[]
          ).map(validateApplication),
        },
        {
          name: "MP Energise @ 20L/Ha",
          applications: (
            [
              createApplicationWithId({ month: "JUL", startWeek: 3, duration: 1, color: "blue" }),
              createApplicationWithId({ month: "AUG", startWeek: 2, duration: 1, color: "blue" }),
              createApplicationWithId({ month: "DEC", startWeek: 1, duration: 2, color: "blue" }),
              createApplicationWithId({ month: "JAN", startWeek: 3, duration: 1, color: "blue" }),
              createApplicationWithId({ month: "FEB", startWeek: 1, duration: 2, color: "blue" }),
              createApplicationWithId({ month: "MAR", startWeek: 2, duration: 1, color: "blue" }),
            ] as ApplicationPeriod[]
          ).map(validateApplication),
        },
        {
          name: "MP Vitalise @ 20 L/ha",
          applications: (
            [
              createApplicationWithId({ month: "DEC", startWeek: 2, duration: 1, color: "blue" }),
              createApplicationWithId({ month: "JAN", startWeek: 1, duration: 2, color: "blue" }),
              createApplicationWithId({ month: "FEB", startWeek: 2, duration: 1, color: "blue" }),
              createApplicationWithId({ month: "MAR", startWeek: 1, duration: 2, color: "blue" }),
              createApplicationWithId({ month: "APR", startWeek: 1, duration: 2, color: "blue" }),
              createApplicationWithId({ month: "MAY", startWeek: 2, duration: 1, color: "blue" }),
            ] as ApplicationPeriod[]
          ).map(validateApplication),
        },
        {
          name: "MP Promote @ 10 L/ha",
          applications: (
            [
              createApplicationWithId({ month: "AUG", startWeek: 3, duration: 1, color: "blue" }),
              createApplicationWithId({ month: "SEP", startWeek: 1, duration: 2, color: "blue" }),
              createApplicationWithId({ month: "DEC", startWeek: 3, duration: 1, color: "blue" }),
              createApplicationWithId({ month: "JAN", startWeek: 2, duration: 1, color: "blue" }),
              createApplicationWithId({ month: "FEB", startWeek: 1, duration: 2, color: "blue" }),
              createApplicationWithId({ month: "MAR", startWeek: 2, duration: 2, color: "blue" }),
            ] as ApplicationPeriod[]
          ).map(validateApplication),
        },
        {
          name: "Springstart @ 100 kg/ha",
          applications: (
            [
              createApplicationWithId({ month: "AUG", startWeek: 1, duration: 2, color: "blue" }),
              createApplicationWithId({ month: "SEP", startWeek: 2, duration: 1, color: "blue" }),
              createApplicationWithId({ month: "DEC", startWeek: 1, duration: 2, color: "blue" }),
              createApplicationWithId({ month: "JAN", startWeek: 1, duration: 2, color: "blue" }),
              createApplicationWithId({ month: "FEB", startWeek: 2, duration: 1, color: "blue" }),
              createApplicationWithId({ month: "MAR", startWeek: 1, duration: 2, color: "blue" }),
            ] as ApplicationPeriod[]
          ).map(validateApplication),
        },
        {
          name: "Dolomite Greens GD @ 200 kg/ha",
          applications: (
            [
              createApplicationWithId({ month: "OCT", startWeek: 2, duration: 2, color: "blue" }),
              createApplicationWithId({ month: "NOV", startWeek: 3, duration: 1, color: "blue" }),
              createApplicationWithId({ month: "DEC", startWeek: 1, duration: 2, color: "blue" }),
            ] as ApplicationPeriod[]
          ).map(validateApplication),
        },
      ],
    },
    {
      title: "ADD-ON - NUTRITION:",
      subtitle: "Fields: Anzac 1, Anzac 2,",
      items: [
        {
          name: "Envirocoal",
          applications: (
            [
              createApplicationWithId({ month: "JUL", startWeek: 1, duration: 2, color: "blue" }),
              createApplicationWithId({ month: "AUG", startWeek: 2, duration: 1, color: "blue" }),
            ] as ApplicationPeriod[]
          ).map(validateApplication),
        },
      ],
    },
    {
      title: "BASE PROTECTION - SOIL MOISTURE:",
      subtitle: "Fields: Buckle, Corea, Jannali 1, Oyster Bay",
      items: [
        {
          name: "Tricure AD @ 10 L/ha",
          applications: (
            [
              createApplicationWithId({ month: "AUG", startWeek: 1, duration: 1, color: "blue" }),
              createApplicationWithId({ month: "OCT", startWeek: 2, duration: 2, color: "blue" }),
              createApplicationWithId({ month: "NOV", startWeek: 3, duration: 1, color: "blue" }),
              createApplicationWithId({ month: "JAN", startWeek: 1, duration: 2, color: "blue" }),
              createApplicationWithId({ month: "MAR", startWeek: 2, duration: 2, color: "blue" }),
            ] as ApplicationPeriod[]
          ).map(validateApplication),
        },
      ],
    },
    {
      title: "BASE PROTECTION - ARGENTINE STEM WEEVIL",
      subtitle: "Fields: Buckle, Corea, Jannali 1, Oyster Bay",
      items: [
        {
          name: "Acelepryn @ 1.5 L/ha",
          applications: (
            [
              createApplicationWithId({ month: "AUG", startWeek: 1, duration: 3, color: "orange" }),
              createApplicationWithId({ month: "SEP", startWeek: 2, duration: 2, color: "orange" }),
              createApplicationWithId({ month: "OCT", startWeek: 1, duration: 3, color: "orange" }),
              createApplicationWithId({ month: "NOV", startWeek: 2, duration: 2, color: "orange" }),
              createApplicationWithId({ month: "DEC", startWeek: 1, duration: 3, color: "orange" }),
              createApplicationWithId({ month: "JAN", startWeek: 2, duration: 2, color: "orange" }),
              createApplicationWithId({ month: "FEB", startWeek: 1, duration: 3, color: "orange" }),
              createApplicationWithId({ month: "MAR", startWeek: 2, duration: 2, color: "orange" }),
              createApplicationWithId({ month: "APR", startWeek: 1, duration: 3, color: "orange" }),
              createApplicationWithId({ month: "JUN", startWeek: 2, duration: 2, color: "orange" }),
            ] as ApplicationPeriod[]
          ).map(validateApplication),
        },
        {
          name: "Brushwet @300mL/100L of water",
          applications: (
            [
              createApplicationWithId({ month: "AUG", startWeek: 1, duration: 3, color: "orange" }),
              createApplicationWithId({ month: "SEP", startWeek: 2, duration: 2, color: "orange" }),
              createApplicationWithId({ month: "OCT", startWeek: 1, duration: 3, color: "orange" }),
              createApplicationWithId({ month: "NOV", startWeek: 2, duration: 2, color: "orange" }),
              createApplicationWithId({ month: "DEC", startWeek: 1, duration: 3, color: "orange" }),
              createApplicationWithId({ month: "JAN", startWeek: 2, duration: 2, color: "orange" }),
              createApplicationWithId({ month: "FEB", startWeek: 1, duration: 3, color: "orange" }),
              createApplicationWithId({ month: "MAR", startWeek: 2, duration: 2, color: "orange" }),
              createApplicationWithId({ month: "APR", startWeek: 1, duration: 3, color: "orange" }),
              createApplicationWithId({ month: "JUN", startWeek: 2, duration: 2, color: "orange" }),
            ] as ApplicationPeriod[]
          ).map(validateApplication),
        },
      ],
    },
    {
      title: "BASE PROTECTION - NEMATODE PREVENTION",
      subtitle: "Fields: Buckle, Corea, Jannali 1, Oyster Bay",
      items: [
        {
          name: "Indemnify @ 1.25 L/ha",
          applications: (
            [
              createApplicationWithId({ month: "AUG", startWeek: 2, duration: 3, color: "orange" }),
              createApplicationWithId({ month: "SEP", startWeek: 1, duration: 2, color: "orange" }),
              createApplicationWithId({ month: "OCT", startWeek: 2, duration: 3, color: "orange" }),
              createApplicationWithId({ month: "NOV", startWeek: 1, duration: 2, color: "orange" }),
              createApplicationWithId({ month: "JAN", startWeek: 1, duration: 3, color: "orange" }),
              createApplicationWithId({ month: "FEB", startWeek: 2, duration: 2, color: "orange" }),
              createApplicationWithId({ month: "MAY", startWeek: 1, duration: 3, color: "orange" }),
              createApplicationWithId({ month: "JUN", startWeek: 1, duration: 2, color: "orange" }),
            ] as ApplicationPeriod[]
          ).map(validateApplication),
        },
      ],
    },
    {
      title: "BASE PROTECTION - PYTHIUM",
      subtitle: "Fields: Buckle, Corea, Jannali 1, Oyster Bay",
      items: [
        {
          name: "Signature Xtra Stressgard @ 11 kg/ha",
          applications: (
            [
              createApplicationWithId({ month: "AUG", startWeek: 1, duration: 2, color: "green" }),
              createApplicationWithId({ month: "SEP", startWeek: 2, duration: 1, color: "green" }),
              createApplicationWithId({ month: "OCT", startWeek: 1, duration: 3, color: "green" }),
              createApplicationWithId({ month: "NOV", startWeek: 2, duration: 2, color: "green" }),
              createApplicationWithId({ month: "DEC", startWeek: 1, duration: 2, color: "green" }),
              createApplicationWithId({ month: "JAN", startWeek: 2, duration: 1, color: "green" }),
              createApplicationWithId({ month: "FEB", startWeek: 1, duration: 2, color: "green" }),
              createApplicationWithId({ month: "APR", startWeek: 2, duration: 2, color: "green" }),
            ] as ApplicationPeriod[]
          ).map(validateApplication),
        },
      ],
    },
    {
      title: "BASE PROTECTION - GENERAL DISEASE PROGRAM",
      subtitle: "Fields: Buckle, Corea, Jannali 1, Oyster Bay",
      items: [
        {
          name: "Instrata @ 18 L/ha",
          applications: (
            [
              createApplicationWithId({ month: "JUL", startWeek: 1, duration: 3, color: "green" }),
              createApplicationWithId({ month: "AUG", startWeek: 1, duration: 2, color: "green" }),
              createApplicationWithId({ month: "SEP", startWeek: 2, duration: 3, color: "green" }),
              createApplicationWithId({ month: "OCT", startWeek: 1, duration: 3, color: "green" }),
              createApplicationWithId({ month: "NOV", startWeek: 2, duration: 2, color: "green" }),
              createApplicationWithId({ month: "DEC", startWeek: 1, duration: 3, color: "green" }),
              createApplicationWithId({ month: "JAN", startWeek: 1, duration: 2, color: "green" }),
              createApplicationWithId({ month: "FEB", startWeek: 1, duration: 2, color: "green" }),
              createApplicationWithId({ month: "MAR", startWeek: 2, duration: 3, color: "green" }),
              createApplicationWithId({ month: "APR", startWeek: 1, duration: 2, color: "green" }),
              createApplicationWithId({ month: "MAY", startWeek: 1, duration: 2, color: "green" }),
              createApplicationWithId({ month: "JUN", startWeek: 2, duration: 2, color: "green" }),
            ] as ApplicationPeriod[]
          ).map(validateApplication),
        },
        {
          name: "Tribeca @ 6 L/ha",
          applications: (
            [
              createApplicationWithId({ month: "JUL", startWeek: 2, duration: 3, color: "green" }),
              createApplicationWithId({ month: "AUG", startWeek: 2, duration: 1, color: "green" }),
              createApplicationWithId({ month: "SEP", startWeek: 1, duration: 2, color: "green" }),
              createApplicationWithId({ month: "OCT", startWeek: 2, duration: 3, color: "green" }),
              createApplicationWithId({ month: "NOV", startWeek: 1, duration: 2, color: "green" }),
              createApplicationWithId({ month: "DEC", startWeek: 2, duration: 2, color: "green" }),
              createApplicationWithId({ month: "JAN", startWeek: 2, duration: 3, color: "green" }),
              createApplicationWithId({ month: "FEB", startWeek: 2, duration: 1, color: "green" }),
              createApplicationWithId({ month: "MAR", startWeek: 1, duration: 2, color: "green" }),
              createApplicationWithId({ month: "APR", startWeek: 2, duration: 1, color: "green" }),
              createApplicationWithId({ month: "JUN", startWeek: 1, duration: 2, color: "green" }),
            ] as ApplicationPeriod[]
          ).map(validateApplication),
        },
        {
          name: "Maxtima @ 2.5 L/ha",
          applications: (
            [
              createApplicationWithId({ month: "JAN", startWeek: 1, duration: 2, color: "green" }),
              createApplicationWithId({ month: "FEB", startWeek: 2, duration: 1, color: "green" }),
              createApplicationWithId({ month: "MAR", startWeek: 1, duration: 2, color: "green" }),
              createApplicationWithId({ month: "APR", startWeek: 2, duration: 1, color: "green" }),
              createApplicationWithId({ month: "MAY", startWeek: 1, duration: 3, color: "green" }),
              createApplicationWithId({ month: "JUN", startWeek: 1, duration: 2, color: "green" }),
            ] as ApplicationPeriod[]
          ).map(validateApplication),
        },
        {
          name: "Lexicon Intrinsic @ 1.5 L/ha",
          applications: (
            [
              createApplicationWithId({ month: "JUL", startWeek: 1, duration: 2, color: "green" }),
              createApplicationWithId({ month: "AUG", startWeek: 2, duration: 1, color: "green" }),
              createApplicationWithId({ month: "SEP", startWeek: 1, duration: 2, color: "green" }),
              createApplicationWithId({ month: "JAN", startWeek: 1, duration: 3, color: "green" }),
              createApplicationWithId({ month: "FEB", startWeek: 2, duration: 1, color: "green" }),
              createApplicationWithId({ month: "MAR", startWeek: 1, duration: 2, color: "green" }),
              createApplicationWithId({ month: "APR", startWeek: 2, duration: 1, color: "green" }),
              createApplicationWithId({ month: "MAY", startWeek: 1, duration: 3, color: "green" }),
              createApplicationWithId({ month: "JUN", startWeek: 2, duration: 2, color: "green" }),
            ] as ApplicationPeriod[]
          ).map(validateApplication),
        },
        {
          name: "Enclave @ 20 L/ha",
          applications: (
            [
              createApplicationWithId({ month: "JUL", startWeek: 2, duration: 3, color: "green" }),
              createApplicationWithId({ month: "AUG", startWeek: 1, duration: 2, color: "green" }),
              createApplicationWithId({ month: "SEP", startWeek: 2, duration: 3, color: "green" }),
              createApplicationWithId({ month: "OCT", startWeek: 1, duration: 2, color: "green" }),
              createApplicationWithId({ month: "NOV", startWeek: 2, duration: 1, color: "green" }),
              createApplicationWithId({ month: "DEC", startWeek: 1, duration: 2, color: "green" }),
              createApplicationWithId({ month: "JAN", startWeek: 2, duration: 3, color: "green" }),
              createApplicationWithId({ month: "FEB", startWeek: 1, duration: 2, color: "green" }),
              createApplicationWithId({ month: "MAR", startWeek: 2, duration: 3, color: "green" }),
              createApplicationWithId({ month: "APR", startWeek: 1, duration: 2, color: "green" }),
              createApplicationWithId({ month: "MAY", startWeek: 2, duration: 3, color: "green" }),
            ] as ApplicationPeriod[]
          ).map(validateApplication),
        },
      ],
    },
    {
      title: "ADD-ON PROTECTION - NEMATODE PREVENTION",
      subtitle: "Fields: Anzac 1",
      items: [
        {
          name: "Indemnify @ 1.25 L/ha",
          applications: (
            [
              createApplicationWithId({ month: "AUG", startWeek: 2, duration: 3, color: "orange" }),
              createApplicationWithId({ month: "SEP", startWeek: 1, duration: 2, color: "orange" }),
              createApplicationWithId({ month: "OCT", startWeek: 2, duration: 3, color: "orange" }),
              createApplicationWithId({ month: "NOV", startWeek: 1, duration: 2, color: "orange" }),
              createApplicationWithId({ month: "JAN", startWeek: 1, duration: 3, color: "orange" }),
              createApplicationWithId({ month: "FEB", startWeek: 2, duration: 2, color: "orange" }),
              createApplicationWithId({ month: "MAY", startWeek: 1, duration: 3, color: "orange" }),
              createApplicationWithId({ month: "JUN", startWeek: 1, duration: 2, color: "orange" }),
            ] as ApplicationPeriod[]
          ).map(validateApplication),
        },
      ],
    },
    {
      title: "ADD-ON PROTECTION - PYTHIUM",
      subtitle: "Fields: Anzac 1",
      items: [
        {
          name: "Signature Xtra Stressgard @ 11 kg/ha",
          applications: (
            [
              createApplicationWithId({ month: "AUG", startWeek: 1, duration: 2, color: "green" }),
              createApplicationWithId({ month: "SEP", startWeek: 2, duration: 1, color: "green" }),
              createApplicationWithId({ month: "OCT", startWeek: 1, duration: 3, color: "green" }),
              createApplicationWithId({ month: "NOV", startWeek: 2, duration: 2, color: "green" }),
              createApplicationWithId({ month: "DEC", startWeek: 1, duration: 2, color: "green" }),
              createApplicationWithId({ month: "JAN", startWeek: 2, duration: 1, color: "green" }),
              createApplicationWithId({ month: "FEB", startWeek: 1, duration: 2, color: "green" }),
              createApplicationWithId({ month: "APR", startWeek: 2, duration: 2, color: "green" }),
            ] as ApplicationPeriod[]
          ).map(validateApplication),
        },
      ],
    },
  ]

  const [programData, setProgramData] = useState<ProgramSection[]>(initialProgramData)
  const [dragState, setDragState] = useState<DragState | null>(null)
  const [dropTarget, setDropTarget] = useState<{ month: string; week: number } | null>(null)

  const handlePrint = () => {
    window.print()
  }

  const getIntensityClass = (weekInSequence: number, color: string, isDragging = false) => {
    const baseClasses = "w-6 h-6 transition-all"
    const intensity = weekInSequence === 1 ? "heavy" : weekInSequence === 2 ? "medium" : "light"
    const opacity = isDragging ? "opacity-50" : ""

    switch (color) {
      case "blue":
        return `${baseClasses} ${opacity} ${intensity === "heavy" ? "bg-blue-600" : intensity === "medium" ? "bg-blue-400" : "bg-blue-200"}`
      case "orange":
        return `${baseClasses} ${opacity} ${intensity === "heavy" ? "bg-orange-600" : intensity === "medium" ? "bg-orange-400" : "bg-orange-200"}`
      case "green":
        return `${baseClasses} ${opacity} ${intensity === "heavy" ? "bg-green-600" : intensity === "medium" ? "bg-green-400" : "bg-green-200"}`
      case "red":
        return `${baseClasses} ${opacity} ${intensity === "heavy" ? "bg-red-600" : intensity === "medium" ? "bg-red-400" : "bg-red-200"}`
      case "purple":
        return `${baseClasses} ${opacity} ${intensity === "heavy" ? "bg-purple-600" : intensity === "medium" ? "bg-purple-400" : "bg-purple-200"}`
      default:
        return `${baseClasses} bg-gray-200`
    }
  }

  // Helper function to check if a week is part of an application period
  const getApplicationForWeek = (applications: ApplicationPeriod[], month: string, week: number) => {
    for (const app of applications) {
      if (app.month === month) {
        const endWeek = app.startWeek + app.duration - 1
        if (week >= app.startWeek && week <= endWeek) {
          const weekInSequence = week - app.startWeek + 1
          return { application: app, weekInSequence }
        }
      }
    }
    return null
  }

  const handleDragStart = (
    e: React.DragEvent,
    sectionIndex: number,
    itemIndex: number,
    applicationId: string,
    itemName: string,
  ) => {
    setDragState({
      itemName,
      applicationId,
      sectionIndex,
      itemIndex,
    })
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragEnd = () => {
    setDragState(null)
    setDropTarget(null)
  }

  const handleDragOver = (e: React.DragEvent, month: string, week: number) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    setDropTarget({ month, week })
  }

  const handleDragLeave = () => {
    setDropTarget(null)
  }

  const handleDrop = (e: React.DragEvent, targetMonth: string, targetWeek: number) => {
    e.preventDefault()

    if (!dragState) return

    const newProgramData = [...programData]
    const section = newProgramData[dragState.sectionIndex]
    const item = section.items[dragState.itemIndex]

    // Find the application being dragged
    const appIndex = item.applications.findIndex((app) => app.id === dragState.applicationId)
    if (appIndex === -1) return

    const draggedApp = item.applications[appIndex]

    // Validate the new position
    const maxWeeks = getMaxWeeksForMonth(targetMonth)
    if (targetWeek > maxWeeks || targetWeek < 1) return

    // Calculate if the duration fits in the target month
    const maxDuration = maxWeeks - targetWeek + 1
    const newDuration = Math.min(draggedApp.duration, maxDuration)

    // Update the application with new position
    item.applications[appIndex] = validateApplication({
      ...draggedApp,
      month: targetMonth,
      startWeek: targetWeek,
      duration: newDuration,
    })

    setProgramData(newProgramData)
    setDragState(null)
    setDropTarget(null)
  }

  return (
    <div className="w-full max-w-full mx-auto p-6 bg-gray-50 min-h-screen overflow-x-auto">
      <Card className="w-full min-w-max">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg shadow-lg">
              <Sprout className="w-8 h-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Turf Tracker
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Great for golf course/turf management</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          {/* Season and Month Headers */}
          <div className="border-b bg-gray-100">
            {/* Season Row */}
            <div className="flex">
              <div className="w-80 p-3 border-r bg-white"></div>
              {seasons.map((season, index) => {
                const seasonWeeks = season.months.reduce((sum, monthName) => {
                  const month = months.find((m) => m.name === monthName)
                  return sum + (month?.weeks || 0)
                }, 0)

                return (
                  <div
                    key={index}
                    className={`p-2 text-center text-sm font-medium border-r ${
                      season.name === "Winter"
                        ? "bg-blue-50"
                        : season.name === "Spring"
                          ? "bg-green-50"
                          : season.name === "Summer"
                            ? "bg-yellow-50"
                            : "bg-orange-50"
                    }`}
                    style={{ width: `${seasonWeeks * 24}px` }}
                  >
                    {season.name}
                  </div>
                )
              })}
            </div>

            {/* Month Row */}
            <div className="flex">
              <div className="w-80 p-3 border-r bg-white"></div>
              {months.map((month) => (
                <div
                  key={month.name}
                  className="p-2 text-center text-xs font-medium border-r bg-white"
                  style={{ width: `${month.weeks * 24}px` }}
                >
                  {month.name} ({month.weeks}w)
                </div>
              ))}
            </div>
          </div>

          {/* Program Sections */}
          {programData.map((section, sectionIndex) => (
            <div key={sectionIndex} className="border-b">
              {section.title && (
                <div className="flex bg-gray-50 border-b">
                  <div className="w-80 p-3 border-r">
                    <div className="font-semibold text-sm">{section.title}</div>
                    {section.subtitle && <div className="text-xs text-gray-600 mt-1">{section.subtitle}</div>}
                  </div>
                  <div className="flex-1"></div>
                </div>
              )}

              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex hover:bg-gray-50">
                  <div className="w-80 p-3 border-r">
                    <div className="text-sm">{item.name}</div>
                  </div>
                  <div className="flex">
                    {months.map((month) => (
                      <div key={month.name} className="flex">
                        {Array.from({ length: month.weeks }, (_, weekIndex) => {
                          const weekNumber = weekIndex + 1
                          const applicationData = getApplicationForWeek(item.applications, month.name, weekNumber)
                          const isEvenWeek = weekIndex % 2 === 0
                          const isDragging =
                            dragState?.applicationId === applicationData?.application.id &&
                            applicationData?.weekInSequence === 1
                          const isDropTarget = dropTarget?.month === month.name && dropTarget?.week === weekNumber

                          return (
                            <div
                              key={weekNumber}
                              className={`w-6 flex justify-center items-center border-r relative ${
                                isEvenWeek ? "bg-gray-100" : "bg-white"
                              } ${isDropTarget ? "bg-blue-100 ring-2 ring-blue-400 ring-inset" : ""}`}
                              onDragOver={(e) => handleDragOver(e, month.name, weekNumber)}
                              onDragLeave={handleDragLeave}
                              onDrop={(e) => handleDrop(e, month.name, weekNumber)}
                            >
                              {applicationData && (
                                <div
                                  draggable={applicationData.weekInSequence === 1}
                                  onDragStart={(e) =>
                                    handleDragStart(
                                      e,
                                      sectionIndex,
                                      itemIndex,
                                      applicationData.application.id,
                                      item.name,
                                    )
                                  }
                                  onDragEnd={handleDragEnd}
                                  className={`${getIntensityClass(
                                    applicationData.weekInSequence,
                                    applicationData.application.color,
                                    isDragging,
                                  )} ${applicationData.weekInSequence === 1 ? "cursor-move" : "cursor-default"}`}
                                >
                                  {applicationData.weekInSequence === 1 && (
                                    <GripVertical className="w-4 h-4 text-white opacity-70" />
                                  )}
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
