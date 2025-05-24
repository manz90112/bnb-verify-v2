'use client'

import { useEffect, useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LuShieldCheck } from "react-icons/lu"

// Move transaction generation helpers outside component
const generateRandomHash = () => {
  try {
    return '0x' + Array.from({ length: 64 }, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join('')
  } catch {
    return '0x' + '0'.repeat(64)
  }
}

const generateRandomAddress = () => {
  try {
    return '0x' + Array.from({ length: 40 }, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join('')
  } catch {
    return '0x' + '0'.repeat(40)
  }
}

const generateTransaction = (id: number) => {
  try {
    return {
      id,
      address: generateRandomAddress(),
      txHash: generateRandomHash(),
      amount: (Math.random() * 10000 + 100).toFixed(2),
      timestamp: new Date(Date.now() - Math.random() * 3600000).toLocaleTimeString()
    }
  } catch {
    return {
      id,
      address: '0x' + '0'.repeat(40),
      txHash: '0x' + '0'.repeat(64),
      amount: '0.00',
      timestamp: new Date().toLocaleTimeString()
    }
  }
}

const generateTransactions = (startId: number, count: number) => 
  Array.from({ length: count }, (_, i) => generateTransaction(startId + i))

export default function LiveTransactions() {
  const [transactions, setTransactions] = useState<Array<{
    id: number
    address: string
    txHash: string
    amount: string
    timestamp: string
  }>>([])
  
  const nextIdRef = useRef(0)

  useEffect(() => {
    try {
      setTransactions(generateTransactions(nextIdRef.current, 20))
      nextIdRef.current += 20

      const interval = setInterval(() => {
        setTransactions(prev => {
          const newTx = generateTransaction(nextIdRef.current++)
          return [newTx, ...prev.slice(0, -1)]
        })
      }, 1000)

      return () => clearInterval(interval)
    } catch {
      // Silent error handling to prevent console logs
      return () => {}
    }
  }, [])

  return (
    <Card className="border border-border bg-card/50 backdrop-blur-sm mt-6 group relative overflow-hidden lg:golden-glow-strong">
      <div className="absolute inset-0 bg-gold-radial opacity-0 lg:opacity-100" />
      <div className="absolute inset-0 bg-gold-shimmer opacity-0 lg:opacity-100" />
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-md font-bold lg:golden-text-glow lg:text-gold">LIVE TRANSACTIONS</CardTitle>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-success animate-blink lg:golden-glow"></div>
            <span className="text-xs text-muted-foreground/80">Live</span>
          </div>
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
                    Verified Address: <span className="font-mono">{tx.address.slice(0, 10)}...{tx.address.slice(-3)}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {tx.timestamp} • <span className="font-mono">{tx.txHash.slice(0, 10)}...{tx.txHash.slice(-3)}</span>
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