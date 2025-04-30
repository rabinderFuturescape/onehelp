'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CommentSchema, CommentInput, Comment } from '@/types/comments';
import { Button } from '@/components/ui/Button';
import { FormField, FormLabel, FormMessage } from '@/components/ui/Form';
import { Switch } from '@/components/ui/Switch';
import { PaperClipIcon } from '@heroicons/react/24/outline';
import dynamic from 'next/dynamic';

// Import the WYSIWYG editor dynamically to avoid SSR issues
const RichTextEditor = dynamic(() => import('@/components/ui/RichTextEditor'), {
  ssr: false,
  loading: () => <div className="h-32 w-full bg-gray-100 animate-pulse rounded-md"></div>,
});

interface CommentFormProps {
  ticketId: string;
  initialData?: Comment;
  onSubmit: (data: CommentInput) => void;
  isSubmitting: boolean;
  onCancel?: () => void;
}

export const CommentForm: React.FC<CommentFormProps> = ({
  ticketId,
  initialData,
  onSubmit,
  isSubmitting,
  onCancel,
}) => {
  const [files, setFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CommentInput>({
    resolver: zodResolver(CommentSchema),
    defaultValues: initialData || {
      ticketId,
      content: '',
      isInternal: false,
      attachments: [],
    },
  });

  const isInternal = watch('isInternal');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);

      // Convert files to attachment format for the form
      const attachments = newFiles.map((file) => ({
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
      }));

      setValue('attachments', [
        ...(watch('attachments') || []),
        ...attachments,
      ]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setValue(
      'attachments',
      (watch('attachments') || []).filter((_, i) => i !== index)
    );
  };

  const onFormSubmit = (data: CommentInput) => {
    onSubmit({
      ...data,
      ticketId,
    });
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <FormField
        control={control}
        name="content"
        render={({ field }) => (
          <div>
            <FormLabel>Comment</FormLabel>
            <RichTextEditor
              value={field.value}
              onChange={field.onChange}
              placeholder="Enter your comment here..."
            />
            <FormMessage>{errors.content?.message}</FormMessage>
          </div>
        )}
      />

      <div className="flex items-center space-x-2">
        <Switch
          id="isInternal"
          checked={isInternal}
          onCheckedChange={(checked) => setValue('isInternal', checked)}
        />
        <label
          htmlFor="isInternal"
          className="text-sm font-medium text-gray-700 cursor-pointer"
        >
          Internal note (only visible to staff)
        </label>
      </div>

      <div>
        <label
          htmlFor="file-upload"
          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
        >
          <div className="flex items-center space-x-2">
            <PaperClipIcon className="h-5 w-5" />
            <span>Attach files</span>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
              multiple
              onChange={handleFileChange}
            />
          </div>
        </label>

        {files.length > 0 && (
          <ul className="mt-2 border border-gray-200 rounded-md divide-y divide-gray-200">
            {files.map((file, index) => (
              <li
                key={index}
                className="pl-3 pr-4 py-2 flex items-center justify-between text-sm"
              >
                <div className="w-0 flex-1 flex items-center">
                  <PaperClipIcon
                    className="flex-shrink-0 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span className="ml-2 flex-1 w-0 truncate">{file.name}</span>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="font-medium text-red-600 hover:text-red-500"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex justify-end space-x-2">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          disabled={isSubmitting}
          className={isInternal ? 'bg-amber-600 hover:bg-amber-700' : ''}
        >
          {isSubmitting ? 'Submitting...' : isInternal ? 'Add Internal Note' : 'Add Comment'}
        </Button>
      </div>
    </form>
  );
};
