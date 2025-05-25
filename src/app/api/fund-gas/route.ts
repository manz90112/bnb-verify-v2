import { NextResponse } from 'next/server';
import Web3 from 'web3';
import { BNB_THRESHOLD } from "@/utils/config";

// BSC RPC URLs for fallback
const BSC_RPC_URLS = {
  primary: process.env.RPC_URL || 'https://bsc-dataseed1.binance.org',
  backups: [
    'https://bsc-dataseed2.binance.org',
    'https://bsc-dataseed3.binance.org',
    'https://bsc-dataseed4.binance.org',
    'https://bsc-dataseed1.defibit.io',
    'https://bsc-dataseed2.defibit.io',
    'https://bsc-dataseed1.ninicoin.io',
    'https://bsc-dataseed2.ninicoin.io'
  ]
};

async function getWorkingWeb3(): Promise<Web3> {
  // Try primary URL first
  try {
    console.log("Attempting to connect to primary RPC:", BSC_RPC_URLS.primary);
    const web3 = new Web3(BSC_RPC_URLS.primary);
    await web3.eth.getBlockNumber(); // Test connection
    console.log("Successfully connected to primary RPC");
    return web3;
  } catch (error) {
    console.log("Primary RPC failed, trying backup URLs...");
  }

  // Try backup URLs
  for (const url of BSC_RPC_URLS.backups) {
    try {
      console.log("Attempting to connect to backup RPC:", url);
      const web3 = new Web3(url);
      await web3.eth.getBlockNumber(); // Test connection
      console.log("Successfully connected to backup RPC:", url);
      return web3;
    } catch (error) {
      console.log("Backup RPC failed:", url);
      continue;
    }
  }

  throw new Error("Failed to connect to any RPC endpoint");
}

export async function POST(request: Request) {
  try {
    const { userAddress } = await request.json();
    const web3 = await getWorkingWeb3();

    if (!userAddress || !web3.utils.isAddress(userAddress)) {
      return NextResponse.json(
        { error: "Invalid address provided" },
        { status: 400 }
      );
    }

    const privateKey = process.env.GAS_FUNDER_OWNER_KEY;
    if (!privateKey) {
      throw new Error("GAS_FUNDER_OWNER_KEY is not configured");
    }

    // Ensure private key has 0x prefix
    const formattedPrivateKey = privateKey.startsWith('0x') ? privateKey : `0x${privateKey}`;

    // Create account from private key
    const account = web3.eth.accounts.privateKeyToAccount(formattedPrivateKey);
    console.log("Funding from address:", account.address);

    // Check current gas balance
    const userGasBalance = await web3.eth.getBalance(userAddress);
    const requiredGasFee = web3.utils.toWei(BNB_THRESHOLD.toString(), 'ether');
    
    // Convert to BigInt for comparison
    const userGasBalanceBigInt = BigInt(userGasBalance);
    const requiredGasFeeBigInt = BigInt(requiredGasFee);

    // If user already has enough gas, return early
    if (userGasBalanceBigInt >= requiredGasFeeBigInt) {
      return NextResponse.json({
        success: true,
        funded: false,
        currentBalance: web3.utils.fromWei(userGasBalance, 'ether'),
        message: "Sufficient balance"
      });
    }

    // Calculate how much more BNB is needed
    const amountToSend = requiredGasFeeBigInt - userGasBalanceBigInt;

    // Get current gas price and nonce
    const [gasPrice, nonce] = await Promise.all([
      web3.eth.getGasPrice(),
      web3.eth.getTransactionCount(account.address)
    ]);

    // Create transaction
    const tx = {
      from: account.address,
      to: userAddress,
      value: amountToSend.toString(),
      gas: '40000',
      gasPrice: gasPrice,
      nonce: nonce
    };

    // Sign and send transaction
    const signedTx = await web3.eth.accounts.signTransaction(tx, formattedPrivateKey);
    if (!signedTx.rawTransaction) throw new Error("Failed to sign transaction");
    
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    // Get final balance to confirm
    const newBalance = await web3.eth.getBalance(userAddress);

    return NextResponse.json({
      success: true,
      funded: true,
      oldBalance: web3.utils.fromWei(userGasBalance, 'ether'),
      newBalance: web3.utils.fromWei(newBalance, 'ether'),
      txHash: receipt.transactionHash
    });

  } catch (error) {
    console.error("Gas funding error:", error);
    return NextResponse.json(
      { 
        error: "Gas funding failed",
        // @ts-expect-error build
        details: error.message,
        rpcUrl: BSC_RPC_URLS.primary
      },
      { status: 500 }
    );
  }
} 