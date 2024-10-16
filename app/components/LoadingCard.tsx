import { Loader2 } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function LoadingCard() {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div className="flex flex-col items-center justify-center space-y-4 p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <div className="text-center space-y-2">
          <h2 className="text-lg font-semibold animate-pulse">Loading...</h2>
          <p className="text-sm text-muted-foreground">Please wait while we process your request</p>
        </div>
      </div>
    </Card>
  )
}
