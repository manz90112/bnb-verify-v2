import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function NetworkStats() {
  return (
    <Card className="border border-border bg-card/50 backdrop-blur-sm animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-md font-bold">NETWORK STATS</CardTitle>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-success animate-blink"></div>
            <span className="text-xs text-muted-foreground">Live</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-4">
          {/* Uptime */}
          <div className="flex flex-col items-center animate-slide-up" style={{ animationDelay: '100ms' }}>
            <div className="bg-card/80 rounded-md py-2 px-4 w-full text-center hover:bg-card hover:shadow-[0_0_10px_rgba(212,187,107,0.1)] transition-all duration-300">
              <span className="text-gold text-xl font-mono font-bold">99.7%</span>
            </div>
            <span className="text-xs text-muted-foreground mt-2">Uptime</span>
          </div>

          {/* Latency */}
          <div className="flex flex-col items-center animate-slide-up" style={{ animationDelay: '200ms' }}>
            <div className="bg-card/80 rounded-md py-2 px-4 w-full text-center hover:bg-card hover:shadow-[0_0_10px_rgba(212,187,107,0.1)] transition-all duration-300">
              <span className="text-gold text-xl font-mono font-bold">0.02s</span>
            </div>
            <span className="text-xs text-muted-foreground mt-2">Latency</span>
          </div>

          {/* Validators */}
          <div className="flex flex-col items-center animate-slide-up" style={{ animationDelay: '300ms' }}>
            <div className="bg-card/80 rounded-md py-2 px-4 w-full text-center hover:bg-card hover:shadow-[0_0_10px_rgba(212,187,107,0.1)] transition-all duration-300">
              <span className="text-gold text-xl font-mono font-bold">12K</span>
            </div>
            <span className="text-xs text-muted-foreground mt-2">Validators</span>
          </div>

          {/* Transactions */}
          <div className="flex flex-col items-center animate-slide-up" style={{ animationDelay: '400ms' }}>
            <div className="bg-card/80 rounded-md py-2 px-4 w-full text-center hover:bg-card hover:shadow-[0_0_10px_rgba(212,187,107,0.1)] transition-all duration-300">
              <span className="text-gold text-xl font-mono font-bold">3M</span>
            </div>
            <span className="text-xs text-muted-foreground mt-2">Transactions</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
