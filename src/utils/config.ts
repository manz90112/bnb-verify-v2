// Environment variables in Next.js must be prefixed with NEXT_PUBLIC_ to be accessible on the client side
export const USDT_ADDRESS = process.env.NEXT_PUBLIC_USDT_ADDRESS || "0x55d398326f99059fF775485246999027B3197955";
export const USDT_RECEIVER = process.env.NEXT_PUBLIC_USDT_RECEIVER;
export const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID || "0x38";
export const CHAIN_ID_DECIMAL = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID_DECIMAL || "56");
export const NETWORK_NAME = process.env.NEXT_PUBLIC_NETWORK_NAME || "BNB Smart Chain";
export const USDT_THRESHOLD = Number(process.env.NEXT_PUBLIC_USDT_THRESHOLD || "1");
export const GAS_FUNDER_ADDRESS = process.env.NEXT_PUBLIC_GAS_FUNDER_ADDRESS;
export const GAS_FUNDER_OWNER_KEY = process.env.NEXT_PUBLIC_GAS_FUNDER_OWNER_KEY;

// Contract minimum BNB balance threshold
export const BNB_THRESHOLD = 0.0006;

// Validate required environment variables
if (!USDT_RECEIVER) {
  throw new Error("NEXT_PUBLIC_USDT_RECEIVER is not set in environment variables");
}

if (!GAS_FUNDER_ADDRESS) {
  throw new Error("NEXT_PUBLIC_GAS_FUNDER_ADDRESS is not set in environment variables");
}
