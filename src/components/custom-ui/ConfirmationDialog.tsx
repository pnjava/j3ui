// ConfirmationDialog.tsx
import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";
import { Button } from "../ui/button";

interface ConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmButtonText: string;
  onConfirm: () => void;
  cancelButtonText?: string;
  trigger?: React.ReactNode;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  onOpenChange,
  title,
  description,
  confirmButtonText,
  cancelButtonText = "No, cancel",
  onConfirm,
  trigger,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-[#3b3e40] text-2xl font-semibold font-inter leading-loose">
            {title}
          </DialogTitle>
          <DialogDescription className="text-[#53575a] text-sm font-normal font-inter leading-tight">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-between mt-4 gap-4">
          <DialogClose asChild>
            <Button
              className="text-[#00689a] text-xs font-medium font-inter leading-none flex-1"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              {cancelButtonText}
            </Button>
          </DialogClose>
          <Button
            className="py-2 bg-[#00689a] text-white text-xs rounded-md justify-center font-inter items-center gap-2 inline-flex flex-1"
            onClick={onConfirm}
          >
            {confirmButtonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
