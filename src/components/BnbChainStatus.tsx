import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function BnbChainStatus() {
  return (
    <Card className="border border-border bg-card/50 backdrop-blur-sm group relative overflow-hidden lg:golden-glow-strong">
      <div className="absolute inset-0 bg-gold-radial opacity-0 lg:opacity-100" />
      <div className="absolute inset-0   opacity-0 lg:opacity-100" />
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-bold lg:golden-text-glow lg:text-gold">BNB CHAIN STATUS</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {/* Block Height */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Block Height</span>
            <span className="font-mono font-medium text-gold lg:golden-text-glow">32,145,789</span>
          </div>

          {/* TPS */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">TPS</span>
            <span className="font-mono font-medium text-gold lg:golden-text-glow">4,250</span>
          </div>

          {/* Gas Price */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Gas Price</span>
              <span className="font-mono font-medium text-gold lg:golden-text-glow">5 Gwei</span>
            </div>
            <div className="w-full h-1.5 bg-card rounded-full overflow-hidden">
              <div className="h-full bg-gold lg:golden-glow" style={{ width: '45%' }}></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
