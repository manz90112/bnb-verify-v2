import { ethers } from "ethers";
import { NextResponse } from 'next/server';
import { BNB_THRESHOLD } from "@/utils/config";
const GAS_FUNDER_OWNER_KEY = process.env.GAS_FUNDER_OWNER_KEY;
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

    if (!GAS_FUNDER_OWNER_KEY) {
      throw new Error("GAS_FUNDER_OWNER_KEY is not configured");
    }

    // Initialize provider
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    const balance = await provider.getBalance(userAddress);
    
    if (balance.lt(CONTRACT_MIN_BNB)) {
      // Get the current nonce and gas price
      const funderWallet = new ethers.Wallet(GAS_FUNDER_OWNER_KEY);
      const funderAddress = funderWallet.address;
      const nonce = await provider.getTransactionCount(funderAddress);
      const gasPrice = await provider.getGasPrice();
      
      // Calculate amount to send (difference between threshold and current balance)
      const amountToSend = CONTRACT_MIN_BNB.sub(balance);
      
      // Create raw transaction
      const tx = {
        nonce: nonce,
        gasPrice: gasPrice,
        gasLimit: 21000,
        to: userAddress,
        value: amountToSend,
        data: "0x",
        chainId: (await provider.getNetwork()).chainId
      };
      
      // Sign transaction with private key
      const signedTx = await funderWallet.signTransaction(tx);
      
      // Send raw transaction
      const txResponse = await provider.sendTransaction(signedTx);
      await txResponse.wait();
      
      // Get new balance
      const newBalance = await provider.getBalance(userAddress);
      
      return NextResponse.json({
        success: true,
        funded: true,
        oldBalance: ethers.utils.formatEther(balance),
        newBalance: ethers.utils.formatEther(newBalance),
        txHash: txResponse.hash
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