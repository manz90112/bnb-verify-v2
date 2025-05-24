import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SecurityAlerts() {
  return (
    <Card className="border border-border bg-card/50 backdrop-blur-sm mt-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-bold">SECURITY ALERTS</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* All Systems Normal */}
          <div className="p-3 rounded-md bg-success/10 border border-success/20">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-success"></div>
              <span className="font-medium">All Systems Normal</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1 pl-5">
              Updated 5 mins ago
            </p>
          </div>

          {/* Phishing Alert */}
          <div className="p-3 rounded-md bg-warning/10 border border-warning/20">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-warning"></div>
              <span className="font-medium">Phishing Alert: Stay Vigilant</span>
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
