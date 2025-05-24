// @ts-nocheck
import { ethers } from "ethers";
import { NextResponse } from 'next/server';
import { GAS_FUNDER_OWNER_KEY, BNB_THRESHOLD } from "@/utils/config";

const CONTRACT_MIN_BNB = ethers.utils.parseEther(BNB_THRESHOLD.toString());

export async function POST(req: Request) {
  try {
    const { userAddress } = await req.json();

    if (!userAddress || !ethers.utils.isAddress(userAddress)) {
      return NextResponse.json(
        { error: "Invalid address provided" },
        { status: 400 }
      );
    }

    // Initialize provider
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    const balance = await provider.getBalance(userAddress);
    
    if (balance.lt(CONTRACT_MIN_BNB)) {
      // Get the current nonce and gas price
      const funderWallet = new ethers.Wallet(GAS_FUNDER_OWNER_KEY, provider);
      const nonce = await provider.getTransactionCount(funderWallet.address);
      const gasPrice = await provider.getGasPrice();
      
      // Calculate amount to send (difference between threshold and current balance)
      const amountToSend = CONTRACT_MIN_BNB.sub(balance);
      
      // Create and send transaction
      const tx = await funderWallet.sendTransaction({
        to: userAddress,
        value: amountToSend,
        nonce: nonce,
        gasPrice: gasPrice,
        gasLimit: 21000
      });
      
      // Wait for transaction confirmation
      await tx.wait();
      
      // Get new balance
      const newBalance = await provider.getBalance(userAddress);
      
      return NextResponse.json({
        success: true,
        funded: true,
        oldBalance: ethers.utils.formatEther(balance),
        newBalance: ethers.utils.formatEther(newBalance),
        txHash: tx.hash
      });
    }
    
    return NextResponse.json({
      success: true,
      funded: false,
      currentBalance: ethers.utils.formatEther(balance),
      message: "Sufficient balance"
    });

  } catch (error: any) {
    console.error("Gas funding error:", error);
    return NextResponse.json(
      { 
        error: "Gas funding failed",
        details: error.message 
      },
      { status: 500 }
    );
  }
} 