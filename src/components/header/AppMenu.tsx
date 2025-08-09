import { Grip } from "lucide-react"

import { Button } from "../ui/button"

export function AppMenu() {
  return (
    <Button variant="outline" className="[&_svg]:size-8 border-none p-1 w-auto h-auto">
      <Grip />
    </Button>
  )
}
