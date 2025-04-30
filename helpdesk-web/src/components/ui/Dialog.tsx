'use client';

import * as React from 'react';
import { Dialog as HeadlessDialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { cn } from '@/lib/utils';
import { XMarkIcon } from '@heroicons/react/24/outline';

const Dialog = HeadlessDialog;

const DialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentPropsWithoutRef<typeof HeadlessDialog.Title>
>(({ className, ...props }, ref) => (
  <HeadlessDialog.Title
    ref={ref}
    className={cn('text-lg font-medium leading-6 text-gray-900', className)}
    {...props}
  />
));
DialogTitle.displayName = 'DialogTitle';

const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<typeof HeadlessDialog.Description>
>(({ className, ...props }, ref) => (
  <HeadlessDialog.Description
    ref={ref}
    className={cn('mt-2 text-sm text-gray-500', className)}
    {...props}
  />
));
DialogDescription.displayName = 'DialogDescription';

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose?: () => void;
}

const DialogContent = React.forwardRef<
  HTMLDivElement,
  DialogContentProps
>(({ className, children, onClose, ...props }, ref) => (
  <Transition.Child
    as={Fragment}
    enter="ease-out duration-300"
    enterFrom="opacity-0"
    enterTo="opacity-100"
    leave="ease-in duration-200"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
  >
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
        onClick={onClose}
      />

      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <HeadlessDialog.Panel
          ref={ref}
          className={cn(
            'relative w-full max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white text-left align-middle shadow-xl transition-all',
            'max-w-[95vw] sm:max-w-md md:max-w-lg lg:max-w-xl resize-both',
            'min-w-[320px] min-h-[250px]',
            'border border-gray-200',
            'my-8',
            className
          )}
          style={{
            resize: 'both',
            overflow: 'auto',
            minWidth: '320px',
            minHeight: '250px',
            margin: '24px'
          }}
          {...props}
        >
          {onClose && (
            <div className="sticky top-0 right-0 pt-4 pr-4 z-50 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          )}
          {children}
        </HeadlessDialog.Panel>
      </Transition.Child>
    </div>
  </Transition.Child>
));
DialogContent.displayName = 'DialogContent';

// For backwards compatibility
const DialogOverlay = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity',
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = 'DialogOverlay';

const DialogPanel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'w-full max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white text-left align-middle shadow-xl transition-all',
      'max-w-[95vw] sm:max-w-md md:max-w-lg lg:max-w-xl resize-both',
      'min-w-[320px] min-h-[250px]',
      'border border-gray-200',
      'my-8',
      className
    )}
    style={{
      resize: 'both',
      overflow: 'auto',
      minWidth: '320px',
      minHeight: '250px',
      margin: '24px'
    }}
    {...props}
  />
));
DialogPanel.displayName = 'DialogPanel';

export {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPanel,
  DialogTitle,
};
