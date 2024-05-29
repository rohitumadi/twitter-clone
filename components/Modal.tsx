import * as Dialog from "@radix-ui/react-dialog";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export default function Modal({
  isOpen,
  onChange,
  title,
  description,
  children,
}: ModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onChange} defaultOpen={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-neutral-800/60  fixed inset-0" />
        <Dialog.Content className="fixed drop-shadow-md  top-1/2 left-1/2 max-h-full h-full md:h-auto md:max-h-[85vh] w-full md:w-[90vw] md:max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-black p-[25px] focus:outline-none">
          <Dialog.Title className="text-xl text-center text-white font-bold mb-4">
            {title}
          </Dialog.Title>
          <Dialog.Description className="text-sm text-center mb-5 leading-normal">
            {description}
          </Dialog.Description>
          {children}

          <Dialog.Close asChild>
            <button className="text-neutral-400 hover:text-white absolute top-[15px] right-[15px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:outline-none">
              <IoMdClose />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
