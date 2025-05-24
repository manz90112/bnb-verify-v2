'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LuShieldCheck } from "react-icons/lu"

// Generate a random wallet address
const generateWalletAddress = () => {
  const prefix = '0x'
  const chars = '0123456789abcdef'
  const length = 8
  let result = prefix
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)]
  }
  result += '...'
  result += chars[Math.floor(Math.random() * chars.length)]
  result += chars[Math.floor(Math.random() * chars.length)]
  result += chars[Math.floor(Math.random() * chars.length)]
  return result
}

// Generate a random transaction hash
const generateTxHash = () => {
  const chars = '0123456789abcdef'
  const length = 8
  let result = '0x'
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)]
  }
  result += '...'
  return result
}

// Generate a random USDT amount
const generateAmount = () => {
  return (Math.random() * 100000).toFixed(2)
}

// Generate initial transactions
const generateTransactions = (count: number) => {
  return Array.from({ length: count }, () => ({
    id: Math.random().toString(),
    address: generateWalletAddress(),
    amount: generateAmount(),
    txHash: generateTxHash(),
    timestamp: 'just now',
    verified: true
  }))
}

export default function LiveTransactions() {
  const [transactions, setTransactions] = useState(generateTransactions(20))

  useEffect(() => {
    const interval = setInterval(() => {
      setTransactions(prev => {
        const newTx = {
          id: Math.random().toString(),
          address: generateWalletAddress(),
          amount: generateAmount(),
          txHash: generateTxHash(),
          timestamp: 'just now',
          verified: true
        }
        return [newTx, ...prev.slice(0, -1)]
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="border border-border bg-card/50 backdrop-blur-sm mt-6 group relative overflow-hidden golden-glow-strong">
      <div className="absolute inset-0 bg-gold-radial opacity-100" />
      <div className="absolute inset-0 bg-gold-shimmer opacity-100" />
      <CardHeader className="pb-2 flex flex-row justify-between items-center">
        <CardTitle className="text-md font-bold golden-text-glow text-gold">Recent USDT Verifications</CardTitle>
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-success animate-pulse"></div>
          <span className="text-xs text-emerald-400">Live Updates</span>
        </div>
      </CardHeader>
      <CardContent className="max-h-[400px] overflow-y-auto custom-scrollbar">
        <div className="space-y-2">
          {transactions.map((tx) => (
            <div 
              key={tx.id}
              className="flex items-center justify-between p-2 rounded-lg bg-black/20 border border-gold/10 animate-fade-in"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
                  <LuShieldCheck className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gold">
                    Verified Address: <span className="font-mono">{tx.address}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {tx.timestamp} • <span className="font-mono">{tx.txHash}</span>
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-mono font-bold text-gold golden-text-glow">
                  {Number(tx.amount).toLocaleString()} USDT
                </p>
                <p className="text-xs text-emerald-400 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                  Assets Verified
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 