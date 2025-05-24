import { ethers } from 'ethers'

export interface HeaderProps {
  isConnecting: boolean
  userAddress: string | null
  connectWallet: () => Promise<void>
}

export interface VerificationSectionProps {
  isConnecting: boolean
  connectAndFund: () => Promise<void>
  provider: ethers.providers.Web3Provider | null
  signer: ethers.providers.JsonRpcSigner | null
  userAddress: string | null
  usdt: ethers.Contract | null
  balance: ethers.BigNumber | null
  readableBalance: string | null
  decimals: number | null
} 