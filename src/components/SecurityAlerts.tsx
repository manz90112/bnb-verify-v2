import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SecurityAlerts() {
  return (
    <Card className="border border-border bg-card/50 backdrop-blur-sm mt-6 group relative overflow-hidden lg:golden-glow-strong">
      <div className="absolute inset-0 bg-gold-radial opacity-0 lg:opacity-100" />
      <div className="absolute inset-0   opacity-0 lg:opacity-100" />
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-bold lg:golden-text-glow lg:text-gold">SECURITY ALERTS</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* All Systems Normal */}
          <div className="p-3 rounded-md bg-success/10 border border-success/20 lg:golden-border-glow">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-success lg:golden-glow"></div>
              <span className="font-medium lg:golden-text-glow">All Systems Normal</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1 pl-5">
              Updated 5 mins ago
            </p>
          </div>

          {/* Phishing Alert */}
          <div className="p-3 rounded-md bg-warning/10 border border-warning/20 lg:golden-border-glow">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-warning lg:golden-glow"></div>
              <span className="font-medium lg:golden-text-glow">Phishing Alert: Stay Vigilant</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1 pl-5">
              Report suspicious activities
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
