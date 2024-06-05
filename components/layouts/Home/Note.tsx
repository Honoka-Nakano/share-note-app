import * as React from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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
      <CardFooter className="flex justify-between">
        <p className="font-bold text-sky-500">Read More &rarr;</p>
      </CardFooter>
    </Card>
  )
}

export default Note
