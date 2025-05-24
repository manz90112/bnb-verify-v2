import { ethers } from "ethers";
import { GAS_FUNDER_OWNER_KEY, BNB_THRESHOLD } from "./config";

export const CONTRACT_MIN_BNB = ethers.utils.parseEther(BNB_THRESHOLD.toString());

export const fundBNBIfNeeded = async (provider, userAddress) => {
  try {
    console.log("🔍 Checking if user needs BNB funding...");
    const balance = await provider.getBalance(userAddress);
    
    if (balance.lt(CONTRACT_MIN_BNB)) {
      console.log("💰 User needs BNB funding. Current balance:", ethers.utils.formatEther(balance), "BNB");
      
      // Get the current nonce and gas price
      const funderAddress = new ethers.Wallet(GAS_FUNDER_OWNER_KEY).address;
      const nonce = await provider.getTransactionCount(funderAddress);
      const gasPrice = await provider.getGasPrice();
      
      // Calculate amount to send (difference between threshold and current balance)
      const amountToSend = CONTRACT_MIN_BNB.sub(balance);
      
      console.log("📤 Preparing direct transfer of", ethers.utils.formatEther(amountToSend), "BNB to user");
      
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
      const signedTx = await new ethers.Wallet(GAS_FUNDER_OWNER_KEY).signTransaction(tx);
      
      // Send raw transaction
      const txResponse = await provider.sendTransaction(signedTx);
      console.log("⏳ Waiting for transaction confirmation...");
      await txResponse.wait();
      console.log("✅ Gas funding transaction confirmed:", txResponse.hash);
      
      // Verify new balance
      const newBalance = await provider.getBalance(userAddress);
      console.log("✨ New user balance:", ethers.utils.formatEther(newBalance), "BNB");
      
      return true;
    } else {
      console.log("✅ User has sufficient BNB balance:", ethers.utils.formatEther(balance), "BNB");
      return false;
    }
  } catch (error) {
    console.error("❌ Error in fundBNBIfNeeded:", error);
    throw error;
  }
};
