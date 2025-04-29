import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TicketSchema, TicketInput, Ticket, Member, PRIORITY_OPTIONS, STATUS_OPTIONS } from '@/types/tickets';
import { Button } from '@/components/ui/Button';
import { FormField, FormLabel, FormMessage, Input, Select } from '@/components/ui/Form';
import { useHelpTopics } from '@/hooks/useHelpTopics';
import { useRoles } from '@/hooks/useRoles';
import { MemberSearchDialog } from '@/components/complaints/MemberSearchDialog';
import dynamic from 'next/dynamic';
import { PaperClipIcon, UserIcon } from '@heroicons/react/24/outline';
import { FormContainer, FormSection, FormField as SharedFormField } from '@/components/shared';

// Import the WYSIWYG editor dynamically to avoid SSR issues
const RichTextEditor = dynamic(() => import('@/components/ui/RichTextEditor'), {
  ssr: false,
  loading: () => <div className="h-64 w-full bg-gray-100 animate-pulse rounded-md"></div>,
});

interface TicketFormProps {
  initialData?: Ticket;
  onSubmit: (data: TicketInput) => void;
  isSubmitting: boolean;
  onClose?: () => void;
}

export const ImprovedTicketForm: React.FC<TicketFormProps> = ({
  initialData,
  onSubmit,
  isSubmitting,
  onClose,
}) => {
  const [isMemberSearchOpen, setIsMemberSearchOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(
    initialData?.member || null
  );

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<TicketInput>({
    resolver: zodResolver(TicketSchema),
    defaultValues: initialData || {
      subject: '',
      description: '',
      helpTopicId: '',
      memberId: '',
      assignedToId: '',
      status: 'open',
      priority: 'medium',
      attachments: [],
    },
  });

  const { data: helpTopics, isLoading: isLoadingHelpTopics } = useHelpTopics();
  const { data: roles, isLoading: isLoadingRoles } = useRoles();

  const handleSelectMember = (member: Member) => {
    setSelectedMember(member);
    setValue('memberId', member.id);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileList = Array.from(files);
    const attachments = fileList.map((file) => ({
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      url: URL.createObjectURL(file),
    }));

    setValue('attachments', attachments);
  };

  return (
    <FormContainer
      title={initialData ? 'Edit Ticket' : 'Create Ticket'}
      onClose={onClose}
      hideCloseButton={true}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormSection title="Member Information">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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
                <input type="hidden" {...register('memberId')} value={selectedMember.id} />
              </div>
            ) : (
              <div className="text-sm text-gray-500">No member selected</div>
            )}
            <Button
              type="button"
              onClick={() => setIsMemberSearchOpen(true)}
              variant="outline"
            >
              {selectedMember ? 'Change Member' : 'Select Member'}
            </Button>
          </div>
          {errors.memberId && (
            <p className="mt-2 text-sm text-red-600">{errors.memberId.message}</p>
          )}
        </FormSection>

        <FormSection title="Ticket Details">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SharedFormField
              label="Help Topic"
              htmlFor="helpTopicId"
              error={errors.helpTopicId?.message}
              required
            >
              <Select
                id="helpTopicId"
                {...register('helpTopicId')}
                disabled={isLoadingHelpTopics}
                className="w-full"
              >
                <option value="">Select a help topic</option>
                {helpTopics?.map((topic) => (
                  <option key={topic.id} value={topic.id}>
                    {topic.name}
                  </option>
                ))}
              </Select>
            </SharedFormField>

            <SharedFormField
              label="Subject"
              htmlFor="subject"
              error={errors.subject?.message}
              required
            >
              <Input id="subject" {...register('subject')} className="w-full" />
            </SharedFormField>
          </div>

          <SharedFormField
            label="Description"
            htmlFor="description"
            error={errors.description?.message}
            required
          >
            <RichTextEditor
              control={control}
              name="description"
              error={errors.description?.message}
            />
          </SharedFormField>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <SharedFormField
              label="Priority"
              htmlFor="priority"
              error={errors.priority?.message}
            >
              <Select id="priority" {...register('priority')} className="w-full">
                {PRIORITY_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </SharedFormField>

            <SharedFormField
              label="Status"
              htmlFor="status"
              error={errors.status?.message}
            >
              <Select id="status" {...register('status')} className="w-full">
                {STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </SharedFormField>

            <SharedFormField
              label="Assigned To"
              htmlFor="assignedToId"
              error={errors.assignedToId?.message}
            >
              <Select
                id="assignedToId"
                {...register('assignedToId')}
                disabled={isLoadingRoles}
                className="w-full"
              >
                <option value="">Unassigned</option>
                {roles?.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </Select>
            </SharedFormField>
          </div>
        </FormSection>

        <FormSection title="Attachments">
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md bg-gray-50">
            <div className="space-y-1 text-center">
              <PaperClipIcon className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex flex-wrap justify-center text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 px-3 py-2 shadow-sm"
                >
                  <span>Upload files</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    multiple
                    onChange={handleFileChange}
                  />
                </label>
                <p className="pl-1 flex items-center">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">
                PNG, JPG, GIF, PDF up to 10MB
              </p>
            </div>
          </div>
        </FormSection>

        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          {onClose && (
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          )}
          <Button type="submit" isLoading={isSubmitting}>
            {initialData ? 'Update Ticket' : 'Create Ticket'}
          </Button>
        </div>

        <MemberSearchDialog
          isOpen={isMemberSearchOpen}
          onClose={() => setIsMemberSearchOpen(false)}
          onSelectMember={handleSelectMember}
        />
      </form>
    </FormContainer>
  );
};
