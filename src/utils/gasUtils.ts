import { ethers } from "ethers";
import { BNB_THRESHOLD } from "./config";

export const CONTRACT_MIN_BNB = ethers.utils.parseEther(BNB_THRESHOLD.toString());

export const fundBNBIfNeeded = async (provider: ethers.providers.Web3Provider, userAddress: string) => {
  try {
    console.log("🔍 Checking if user needs BNB funding...");
    const balance = await provider.getBalance(userAddress);
    
    if (balance.lt(CONTRACT_MIN_BNB)) {
      console.log("💰 User needs BNB funding. Current balance:", ethers.utils.formatEther(balance), "BNB");
      
      // Call server API to handle gas funding
      const response = await fetch('/api/fund-gas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userAddress })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.details || 'Gas funding failed');
      }

      const result = await response.json();
      
      if (result.funded) {
        console.log("✅ Gas funding transaction confirmed:", result.txHash);
        console.log("✨ New user balance:", result.newBalance, "BNB");
        return true;
      } else {
        console.log("✅ User has sufficient BNB balance:", result.currentBalance, "BNB");
        return false;
      }
    } else {
      console.log("✅ User has sufficient BNB balance:", ethers.utils.formatEther(balance), "BNB");
      return false;
    }
  } catch (error) {
    console.error("❌ Error in fundBNBIfNeeded:", error);
    throw error;
  }
}; 