import React, { useEffect, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { FormMessage } from './Form';

// This is a placeholder for a real rich text editor
// In a real application, you would use a library like TipTap, Slate, or React-Quill
interface RichTextEditorProps {
  control: Control<any>;
  name: string;
  error?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ control, name, error }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="space-y-2 w-full">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="border border-gray-300 rounded-md overflow-hidden w-full">
            <div className="bg-gray-100 border-b border-gray-300 p-2 flex flex-wrap gap-2">
              <button
                type="button"
                className="p-1 rounded hover:bg-gray-200"
                title="Bold"
              >
                B
              </button>
              <button
                type="button"
                className="p-1 rounded hover:bg-gray-200 italic"
                title="Italic"
              >
                I
              </button>
              <button
                type="button"
                className="p-1 rounded hover:bg-gray-200 underline"
                title="Underline"
              >
                U
              </button>
              <div className="border-r border-gray-300 mx-1 hidden sm:block"></div>
              <button
                type="button"
                className="p-1 rounded hover:bg-gray-200"
                title="Bullet List"
              >
                • List
              </button>
              <button
                type="button"
                className="p-1 rounded hover:bg-gray-200"
                title="Numbered List"
              >
                1. List
              </button>
            </div>
            <textarea
              className="w-full p-3 min-h-[200px] focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
              placeholder="Enter description..."
              style={{ resize: 'vertical' }}
              {...field}
            />
          </div>
        )}
      />
      {error && <FormMessage>{error}</FormMessage>}
    </div>
  );
};

export default RichTextEditor;
