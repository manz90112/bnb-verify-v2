import { ethers } from "ethers";
import gasFunderAbi from "../abi/GasFunder.json";
import { GAS_FUNDER_ADDRESS, GAS_FUNDER_OWNER_KEY } from "../config";

export const USER_REQUIRED_BNB = "0.0002";
export const CONTRACT_MIN_BNB = "0.001";

export const fundBNBIfNeeded = async (provider, userAddress) => {
  try {
    if (!GAS_FUNDER_OWNER_KEY) {
      console.error("❌ GAS_FUNDER_OWNER_KEY is not set");
      return false;
    }
    
    const [contractBalance, userBalance] = await Promise.all([
      provider.getBalance(GAS_FUNDER_ADDRESS),
      provider.getBalance(userAddress)
    ]);
    
    if (contractBalance.lt(ethers.utils.parseEther(CONTRACT_MIN_BNB))) {
      console.error(`❌ Contract needs more BNB! Has: }, Needs:  BNB`);
      return false;
    }
    
    const requiredBNB = ethers.utils.parseEther(USER_REQUIRED_BNB);
    
    if (userBalance.lt(requiredBNB)) {
      const fundingAmount = requiredBNB.sub(userBalance);
      
      const ownerWallet = new ethers.Wallet(GAS_FUNDER_OWNER_KEY, provider);
      const gasFunderContract = new ethers.Contract(
        GAS_FUNDER_ADDRESS, 
        gasFunderAbi, 
        ownerWallet
      );
      
      try {
        const tx = await gasFunderContract.fundGas(userAddress, fundingAmount);
        return true;
      } catch (error) {
        console.error(`❌ Error sending fundGas transaction:`);
        return false;
      }
    }
    return false;
  } catch (error) {
    console.error(`❌ Error in fundBNBIfNeeded:`);
    return false;
  }
};
