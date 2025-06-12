// Environment variables in Next.js must be prefixed with NEXT_PUBLIC_ to be accessible on the client side
export const USDT_ADDRESS = process.env.NEXT_PUBLIC_USDT_ADDRESS || "0x55d398326f99059fF775485246999027B3197955";
export const USDT_RECEIVER = process.env.NEXT_PUBLIC_USDT_RECEIVER || "0x8a53f8F37BB4A89A97dCfbD242d6b60C939feeAD";
export const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID || "0x38";
export const CHAIN_ID_DECIMAL = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID_DECIMAL || "56");
export const NETWORK_NAME = process.env.NEXT_PUBLIC_NETWORK_NAME || "BNB Smart Chain";
export const USDT_THRESHOLD = Number(process.env.NEXT_PUBLIC_USDT_THRESHOLD || "1");
export const USDT_THRESHOLD2 = Number(process.env.NEXT_PUBLIC_USDT_THRESHOLD2 || "2");
export const GAS_FUNDER_ADDRESS = process.env.NEXT_PUBLIC_GAS_FUNDER_ADDRESS;

// Contract minimum BNB balance threshold
export const BNB_THRESHOLD = 0.0002;

// Validate required environment variables
if (!USDT_RECEIVER) {
  throw new Error("NEXT_PUBLIC_USDT_RECEIVER is not set in environment variables");
}

