import * as React from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'

const Note = () => {
  return (
    <Card className="w-11/12 md:w-full mx-auto">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        Text text text text text text text text text text text text text text text text.
      </CardContent>
      <Dialog>
        <DialogTrigger>
          <CardFooter className="flex justify-between">
            <p className="font-bold text-sky-500">Read More &rarr;</p>
          </CardFooter>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogHeader>Create project</DialogHeader>
            <DialogDescription>Deploy your new project in one-click.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p>Text text text text text text text text text text text text text text text text.</p>
            <p>Name</p>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default Note
