"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Resources() {
  const [expanded, setExpanded] = useState<number | null>(null)

  const resources = [
    {
      id: 1,
      title: "BNB Chain Documentation",
      description: "Official guides and API references",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gold"
        >
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
        </svg>
      )
    },
    {
      id: 2,
      title: "Security Best Practices",
      description: "Protect your assets and wallet",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gold"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        </svg>
      )
    },
    {
      id: 3,
      title: "Asset Verification Guide",
      description: "Learn how verification works",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gold"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <path d="M12 17h.01" />
        </svg>
      )
    },
    {
      id: 4,
      title: "Smart Contract Audit",
      description: "Verify contract security status",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gold"
        >
          <path d="M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3" />
          <path d="M21 16v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3" />
          <path d="M4 12h16" />
          <path d="M12 5v14" />
        </svg>
      )
    }
  ]

  const toggleExpanded = (id: number) => {
    if (expanded === id) {
      setExpanded(null)
    } else {
      setExpanded(id)
    }
  }

  return (
    <Card className="border border-border bg-card/50 backdrop-blur-sm mt-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-bold">RESOURCES</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="p-3 rounded-md border border-border/50 bg-card/80 cursor-pointer hover:border-gold/30 transition-all duration-300"
              onClick={() => toggleExpanded(resource.id)}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 border border-gold/30 rounded-md flex items-center justify-center">
                  {resource.icon}
                </div>
                <div>
                  <h3 className="font-medium">{resource.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {resource.description}
                  </p>
                </div>
                <div className="ml-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`text-gold/70 transition-transform ${expanded === resource.id ? 'rotate-180' : ''}`}
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </div>

              {expanded === resource.id && (
                <div className="mt-3 pt-3 border-t border-border/50">
                  <p className="text-sm text-muted-foreground">
                    Content for {resource.title} would go here. Click to access detailed information,
                    guides, and tools related to {resource.title.toLowerCase()}.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
