import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "./cn";

type ModalVariant = "drawer" | "center";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
  /**
   * "drawer" (default) → slide-in lateral à direita, full-height
   * "center" → modal centralizado, max-w-lg, max-h-90vh
   */
  variant?: ModalVariant;
}

const variantClasses: Record<ModalVariant, string> = {
  drawer:
    "fixed right-0 top-0 h-full w-full max-w-md " +
    "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
  center:
    "fixed left-1/2 top-1/2 max-h-[90vh] w-[calc(100%-2rem)] max-w-lg " +
    "-translate-x-1/2 -translate-y-1/2 rounded-lg " +
    "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 " +
    "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
};

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  className,
  variant = "drawer",
}: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          className={cn(
            "z-50 flex flex-col bg-white shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out",
            variantClasses[variant],
            className,
          )}
        >
          <header className="flex items-start justify-between border-b border-gray-200 px-6 py-4">
            <div>
              {title ? (
                <Dialog.Title className="text-lg font-semibold text-gray-900">
                  {title}
                </Dialog.Title>
              ) : null}
              {description ? (
                <Dialog.Description className="mt-1 text-sm text-gray-500">
                  {description}
                </Dialog.Description>
              ) : null}
            </div>
            <Dialog.Close
              className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
              aria-label="Fechar"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Fechar</span>
            </Dialog.Close>
          </header>
          <div className="flex-1 overflow-y-auto">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
