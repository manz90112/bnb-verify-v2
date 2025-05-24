"use client"

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { HeaderProps } from '@/types'

const Header = ({ isConnecting, userAddress, connectWallet }: HeaderProps) => {
  return (
    <header className="py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src="/logo.svg" alt="BNB Chain Logo" className="h-8" />
          <h1 className="text-xl font-bold">BNB Chain Verification</h1>
        </div>
        <button
          onClick={connectWallet}
          disabled={isConnecting}
          className="px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 disabled:opacity-50"
        >
          {isConnecting ? 'Connecting...' : userAddress ? `Connected: ${userAddress.slice(0,6)}...${userAddress.slice(-4)}` : 'Connect Wallet'}
        </button>
      </div>
    </header>
  )
}

export default Header
