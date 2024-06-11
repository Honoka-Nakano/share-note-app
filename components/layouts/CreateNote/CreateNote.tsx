import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function CreateNote() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="font-bold">ノートを追加する</Button>
      </DialogTrigger>
      <DialogContent className="w-11/12 rounded-md">
        <DialogHeader>
          <DialogTitle>ノートを追加する</DialogTitle>
          <DialogDescription>
            新しいノートを追加してください。追加ボタンで追加できます。
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="summary" className="text-right">
              要約
            </Label>
            <Input
              id="summary"
              placeholder="要約"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="contents" className="text-right h-full mt-6">
              内容
            </Label>
            <Textarea placeholder="内容" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              名前
            </Label>
            <Input
              id="name"
              placeholder="名前"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="font-bold w-1/2 mx-auto">追加</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateNote
