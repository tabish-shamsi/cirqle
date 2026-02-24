import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <Dialog open>
      <DialogOverlay>
        <DialogContent
          showCloseButton={false}
          className="p-0 rounded-xl md:max-w-150 bg-transparent border-none"
        >
          <DialogHeader className="hidden">
            <DialogTitle></DialogTitle>
          </DialogHeader>

          {children}
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}
