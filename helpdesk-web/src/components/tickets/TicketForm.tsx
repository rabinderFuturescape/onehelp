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

// Import the WYSIWYG editor dynamically to avoid SSR issues
const RichTextEditor = dynamic(() => import('@/components/ui/RichTextEditor'), {
  ssr: false,
  loading: () => <div className="h-64 w-full bg-gray-100 animate-pulse rounded-md"></div>,
});

interface TicketFormProps {
  initialData?: Ticket;
  onSubmit: (data: TicketInput) => void;
  isSubmitting: boolean;
}

export const TicketForm: React.FC<TicketFormProps> = ({
  initialData,
  onSubmit,
  isSubmitting,
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6 w-full max-w-full">
      <div className="bg-white shadow rounded-lg overflow-hidden p-3 sm:p-4 md:p-6 w-full">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Member Information</h3>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">
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
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden p-3 sm:p-4 md:p-6 w-full">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Ticket Details</h3>
        <div className="space-y-4 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField>
            <FormLabel htmlFor="helpTopicId">Help Topic</FormLabel>
            <Select
              id="helpTopicId"
              {...register('helpTopicId')}
              disabled={isLoadingHelpTopics}
            >
              <option value="">Select a help topic</option>
              {helpTopics?.map((topic) => (
                <option key={topic.id} value={topic.id}>
                  {topic.name}
                </option>
              ))}
            </Select>
            <FormMessage>{errors.helpTopicId?.message}</FormMessage>
          </FormField>

          <FormField>
            <FormLabel htmlFor="subject">Subject</FormLabel>
            <Input id="subject" {...register('subject')} />
            <FormMessage>{errors.subject?.message}</FormMessage>
          </FormField>

          <FormField className="col-span-1 sm:col-span-2">
            <FormLabel htmlFor="description">Description</FormLabel>
            <RichTextEditor
              control={control}
              name="description"
              error={errors.description?.message}
            />
          </FormField>

          <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
            <FormField>
              <FormLabel htmlFor="priority">Priority</FormLabel>
              <Select id="priority" {...register('priority')}>
                {PRIORITY_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              <FormMessage>{errors.priority?.message}</FormMessage>
            </FormField>

            <FormField>
              <FormLabel htmlFor="status">Status</FormLabel>
              <Select id="status" {...register('status')}>
                {STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              <FormMessage>{errors.status?.message}</FormMessage>
            </FormField>

            <FormField>
              <FormLabel htmlFor="assignedToId">Assigned To</FormLabel>
              <Select
                id="assignedToId"
                {...register('assignedToId')}
                disabled={isLoadingRoles}
              >
                <option value="">Unassigned</option>
                {roles?.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </Select>
              <FormMessage>{errors.assignedToId?.message}</FormMessage>
            </FormField>
          </div>

          <FormField className="col-span-1 sm:col-span-2">
            <FormLabel htmlFor="attachments">Attachments</FormLabel>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <PaperClipIcon className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex flex-wrap justify-center text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
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
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF, PDF up to 10MB
                </p>
              </div>
            </div>
          </FormField>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
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
  );
};
