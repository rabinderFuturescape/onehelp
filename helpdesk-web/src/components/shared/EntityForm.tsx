import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button';
import { FormField, FormLabel, FormMessage, Input, Select } from '@/components/ui/Form';
import { useHelpTopics } from '@/hooks/useHelpTopics';
import { useRoles } from '@/hooks/useRoles';
import { MemberSearchDialog } from './MemberSearchDialog';
import dynamic from 'next/dynamic';
import { PaperClipIcon, UserIcon } from '@heroicons/react/24/outline';
import { Member } from '@/types/complaints';
import { ZodSchema } from 'zod';

// Import the WYSIWYG editor dynamically to avoid SSR issues
const RichTextEditor = dynamic(() => import('@/components/ui/RichTextEditor'), {
  ssr: false,
  loading: () => <div className="h-64 w-full bg-gray-100 animate-pulse rounded-md"></div>,
});

export interface FormField {
  id: string;
  type: 'text' | 'select' | 'textarea' | 'richtext' | 'member' | 'file' | 'hidden';
  label?: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  required?: boolean;
  gridSpan?: 1 | 2 | 3;
  defaultValue?: any;
}

export interface FormSection {
  title: string;
  fields: FormField[];
}

interface EntityFormProps<T> {
  sections: FormSection[];
  schema: ZodSchema<any>;
  initialData?: T;
  onSubmit: (data: T) => void;
  isSubmitting: boolean;
  submitLabel?: string;
}

export function EntityForm<T>({
  sections,
  schema,
  initialData,
  onSubmit,
  isSubmitting,
  submitLabel = 'Submit',
}: EntityFormProps<T>) {
  const [isMemberSearchOpen, setIsMemberSearchOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(
    (initialData as any)?.member || null
  );
  const [currentMemberField, setCurrentMemberField] = useState<string>('');

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: initialData as any,
  });

  const { data: helpTopics, isLoading: isLoadingHelpTopics } = useHelpTopics();
  const { data: roles, isLoading: isLoadingRoles } = useRoles();

  const handleSelectMember = (member: Member) => {
    setSelectedMember(member);
    setValue(currentMemberField as any, member.id);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldId: string) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileList = Array.from(files);
    const attachments = fileList.map((file) => ({
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      url: URL.createObjectURL(file),
    }));

    setValue(fieldId as any, attachments);
  };

  const openMemberSearch = (fieldId: string) => {
    setCurrentMemberField(fieldId);
    setIsMemberSearchOpen(true);
  };

  const renderField = (field: FormField) => {
    const errorMessage = errors[field.id as keyof typeof errors]?.message as string;

    switch (field.type) {
      case 'text':
        return (
          <FormField key={field.id} className={field.gridSpan ? `sm:col-span-${field.gridSpan}` : ''}>
            {field.label && <FormLabel htmlFor={field.id}>{field.label}</FormLabel>}
            <Input
              id={field.id}
              {...register(field.id as any)}
              placeholder={field.placeholder}
            />
            {errorMessage && <FormMessage>{errorMessage}</FormMessage>}
          </FormField>
        );

      case 'select':
        if (field.id === 'helpTopicId') {
          return (
            <FormField key={field.id} className={field.gridSpan ? `sm:col-span-${field.gridSpan}` : ''}>
              {field.label && <FormLabel htmlFor={field.id}>{field.label}</FormLabel>}
              <Select
                id={field.id}
                {...register(field.id as any)}
                disabled={isLoadingHelpTopics}
              >
                <option value="">Select a help topic</option>
                {helpTopics?.map((topic) => (
                  <option key={topic.id} value={topic.id}>
                    {topic.name}
                  </option>
                ))}
              </Select>
              {errorMessage && <FormMessage>{errorMessage}</FormMessage>}
            </FormField>
          );
        } else if (field.id === 'assignedToId') {
          return (
            <FormField key={field.id} className={field.gridSpan ? `sm:col-span-${field.gridSpan}` : ''}>
              {field.label && <FormLabel htmlFor={field.id}>{field.label}</FormLabel>}
              <Select
                id={field.id}
                {...register(field.id as any)}
                disabled={isLoadingRoles}
              >
                <option value="">Unassigned</option>
                {roles?.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </Select>
              {errorMessage && <FormMessage>{errorMessage}</FormMessage>}
            </FormField>
          );
        } else {
          return (
            <FormField key={field.id} className={field.gridSpan ? `sm:col-span-${field.gridSpan}` : ''}>
              {field.label && <FormLabel htmlFor={field.id}>{field.label}</FormLabel>}
              <Select
                id={field.id}
                {...register(field.id as any)}
              >
                <option value="">Select {field.label}</option>
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              {errorMessage && <FormMessage>{errorMessage}</FormMessage>}
            </FormField>
          );
        }

      case 'richtext':
        return (
          <FormField key={field.id} className={field.gridSpan ? `sm:col-span-${field.gridSpan}` : ''}>
            {field.label && <FormLabel htmlFor={field.id}>{field.label}</FormLabel>}
            <RichTextEditor
              control={control}
              name={field.id}
              error={errorMessage}
            />
          </FormField>
        );

      case 'member':
        return (
          <div key={field.id} className={field.gridSpan ? `sm:col-span-${field.gridSpan}` : ''}>
            {field.label && <h3 className="text-lg font-medium text-gray-900 mb-4">{field.label}</h3>}
            <div className="flex items-center justify-between">
              {selectedMember ? (
                <div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <UserIcon className="h-6 w-6 text-gray-500" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{selectedMember.name}</div>
                      <div className="text-sm text-gray-500">
                        {selectedMember.email || 'No email provided'}
                      </div>
                      {selectedMember.unitNumber && (
                        <div className="text-sm text-gray-500">Unit: {selectedMember.unitNumber}</div>
                      )}
                    </div>
                  </div>
                  <input type="hidden" {...register(field.id as any)} value={selectedMember.id} />
                </div>
              ) : (
                <div className="text-sm text-gray-500">No member selected</div>
              )}
              <Button
                type="button"
                onClick={() => openMemberSearch(field.id)}
                variant="outline"
              >
                {selectedMember ? 'Change Member' : 'Select Member'}
              </Button>
            </div>
            {errorMessage && <p className="mt-2 text-sm text-red-600">{errorMessage}</p>}
          </div>
        );

      case 'file':
        return (
          <FormField key={field.id} className={field.gridSpan ? `sm:col-span-${field.gridSpan}` : ''}>
            {field.label && <FormLabel htmlFor={field.id}>{field.label}</FormLabel>}
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <PaperClipIcon className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor={`file-upload-${field.id}`}
                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                  >
                    <span>Upload files</span>
                    <input
                      id={`file-upload-${field.id}`}
                      name={`file-upload-${field.id}`}
                      type="file"
                      className="sr-only"
                      multiple
                      onChange={(e) => handleFileChange(e, field.id)}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF, PDF up to 10MB
                </p>
              </div>
            </div>
            {errorMessage && <FormMessage>{errorMessage}</FormMessage>}
          </FormField>
        );

      case 'hidden':
        return <input key={field.id} type="hidden" {...register(field.id as any)} />;

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-8 w-full max-w-full p-4 sm:p-6">
      {sections.map((section, index) => (
        <div key={index} className="bg-white shadow rounded-lg overflow-hidden border border-gray-200 p-4 sm:p-6 md:p-8 w-full">
          <h3 className="text-lg font-medium text-gray-900 mb-6 border-b border-gray-100 pb-3">{section.title}</h3>
          <div className="space-y-6 w-full">
            {section.fields.some(f => f.gridSpan) ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 w-full">
                {section.fields.map(renderField)}
              </div>
            ) : (
              <div className="flex flex-col space-y-6 w-full">
                {section.fields.map(renderField)}
              </div>
            )}
          </div>
        </div>
      ))}

      <div className="flex justify-end space-x-3 sticky bottom-0 bg-white p-4 border-t border-gray-200 rounded-b-lg shadow-sm">
        <Button type="submit" isLoading={isSubmitting}>
          {submitLabel}
        </Button>
      </div>

      <MemberSearchDialog
        isOpen={isMemberSearchOpen}
        onClose={() => setIsMemberSearchOpen(false)}
        onSelectMember={handleSelectMember}
      />
    </form>
  );
}
