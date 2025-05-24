"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LuBook, LuShieldCheck, LuCircle, LuFileCheck } from "react-icons/lu"

const resources = [
  {
    id: 1,
    title: "BNB Chain Documentation",
    description: "Official guides and API references",
    icon: <LuBook className="w-4 h-4 text-gold" />,
    content: [
      "• Smart Contract Development Guide",
      "• BEP-20 Token Standard",
      "• Network Parameters & Configuration",
      "• Gas Fee Calculation Methods",
      "• Cross-Chain Bridge Documentation"
    ]
  },
  {
    id: 2,
    title: "Security Best Practices",
    description: "Protect your assets and wallet",
    icon: <LuShieldCheck className="w-4 h-4 text-gold" />,
    content: [
      "• Wallet Security Guidelines",
      "• Smart Contract Audit Checklist",
      "• Common Scam Prevention",
      "• Private Key Management",
      "• Safe Transaction Practices"
    ]
  },
  {
    id: 3,
    title: "Asset Verification Guide",
    description: "Learn how verification works",
    icon: <LuCircle className="w-4 h-4 text-gold" />,
    content: [
      "• Token Verification Process",
      "• Signature Verification Steps",
      "• Asset Security Protocols",
      "• Verification Status Checks",
      "• Common Verification Issues"
    ]
  },
  {
    id: 4,
    title: "Smart Contract Audit",
    description: "Verify contract security status",
    icon: <LuFileCheck className="w-4 h-4 text-gold" />,
    content: [
      "• Automated Security Scans",
      "• Manual Code Review Results",
      "• Vulnerability Assessment",
      "• Security Patches & Updates",
      "• Audit History & Reports"
    ]
  }
]

export default function Resources() {
  const [expanded, setExpanded] = useState<number | null>(null)

  const toggleExpanded = (id: number) => {
    if (expanded === id) {
      setExpanded(null)
    } else {
      setExpanded(id)
    }
  }

  return (
    <Card className="border border-border bg-card/50 backdrop-blur-sm mt-6 group relative overflow-hidden lg:golden-glow-strong">
      <div className="absolute inset-0 bg-gold-radial opacity-0 lg:opacity-100" />
      <div className="absolute inset-0 bg-gold-shimmer opacity-0 lg:opacity-100" />
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-bold lg:golden-text-glow lg:text-gold">RESOURCES</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="p-3 rounded-md border border-border/50 bg-card/80 cursor-pointer hover:border-gold/30 transition-all duration-300 lg:golden-border-glow"
              onClick={() => toggleExpanded(resource.id)}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 border border-gold/30 rounded-md flex items-center justify-center lg:golden-border-glow">
                  {resource.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium lg:golden-text-glow">{resource.title}</h3>
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
                    className={`text-gold/70 transition-transform lg:golden-text-glow ${expanded === resource.id ? 'rotate-180' : ''}`}
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </div>

              {expanded === resource.id && (
                <div className="mt-3 pt-3 border-t border-border/50">
                  <div className="space-y-2 text-sm text-muted-foreground">
                    {resource.content.map((item, index) => (
                      <p key={index} className="transition-colors hover:text-gold cursor-pointer">
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
