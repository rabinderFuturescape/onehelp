import * as React from 'react';
import * as DialogPrimitive from '@headlessui/dialog';
import { cn } from '@/lib/utils';
import { XMarkIcon } from '@heroicons/react/24/outline';

const Dialog = DialogPrimitive.Dialog;

const DialogPanel = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Panel>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Panel>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Panel
    ref={ref}
    className={cn(
      'w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all',
      className
    )}
    {...props}
  />
));
DialogPanel.displayName = DialogPrimitive.Panel.displayName;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity',
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-lg font-medium leading-6 text-gray-900', className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('mt-2 text-sm text-gray-500', className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

interface DialogContentProps extends React.ComponentPropsWithoutRef<typeof DialogPanel> {
  onClose?: () => void;
}

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPanel>,
  DialogContentProps
>(({ className, children, onClose, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogOverlay />
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <DialogPanel ref={ref} className={cn('relative', className)} {...props}>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 rounded-md p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <span className="sr-only">Close</span>
            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
        {children}
      </DialogPanel>
    </div>
  </DialogPrimitive.Portal>
));
DialogContent.displayName = 'DialogContent';

export {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPanel,
  DialogTitle,
};
