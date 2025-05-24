import { Card, CardContent } from "@/components/ui/card"

export default function FeatureCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 sm:mt-6">
      {/* Secure Verification */}
      <Card className="border border-border bg-card/50 backdrop-blur-sm hover:border-gold/30 transition-all duration-300 animate-slide-up group" style={{ animationDelay: '100ms' }}>
        <CardContent className="pt-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/5 to-gold/0 opacity-0 group-hover:opacity-100 translate-x-full group-hover:translate-x-[-200%] transition-all duration-1500"></div>
          <div className="w-10 h-10 border border-gold/30 rounded-md flex items-center justify-center mb-4 group-hover:animate-pulse-glow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gold group-hover:animate-rotate-slow"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            </svg>
          </div>
          <h3 className="font-semibold mb-2 group-hover:text-gold transition-colors duration-300">Secure Verification</h3>
          <p className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-300">
            Military-grade encryption for all your assets
          </p>
        </CardContent>
      </Card>

      {/* Privacy Protected */}
      <Card className="border border-border bg-card/50 backdrop-blur-sm hover:border-gold/30 transition-all duration-300 animate-slide-up group" style={{ animationDelay: '200ms' }}>
        <CardContent className="pt-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/5 to-gold/0 opacity-0 group-hover:opacity-100 translate-x-full group-hover:translate-x-[-200%] transition-all duration-1500"></div>
          <div className="w-10 h-10 border border-gold/30 rounded-md flex items-center justify-center mb-4 group-hover:animate-pulse-glow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gold group-hover:animate-rotate-slow"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h3 className="font-semibold mb-2 group-hover:text-gold transition-colors duration-300">Privacy Protected</h3>
          <p className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-300">
            Your data remains private and secure
          </p>
        </CardContent>
      </Card>

      {/* Instant Results */}
      <Card className="border border-border bg-card/50 backdrop-blur-sm sm:col-span-2 md:col-span-1 hover:border-gold/30 transition-all duration-300 animate-slide-up group" style={{ animationDelay: '300ms' }}>
        <CardContent className="pt-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/5 to-gold/0 opacity-0 group-hover:opacity-100 translate-x-full group-hover:translate-x-[-200%] transition-all duration-1500"></div>
          <div className="w-10 h-10 border border-gold/30 rounded-md flex items-center justify-center mb-4 group-hover:animate-pulse-glow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gold group-hover:animate-rotate-slow"
            >
              <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
              <path d="m13 2 8 7h-8" />
              <path d="M9.5 13h5" />
              <path d="M9.5 17h5" />
              <path d="M9.5 9h1" />
            </svg>
          </div>
          <h3 className="font-semibold mb-2 group-hover:text-gold transition-colors duration-300">Instant Results</h3>
          <p className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-300">
            Get verification results in milliseconds
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
