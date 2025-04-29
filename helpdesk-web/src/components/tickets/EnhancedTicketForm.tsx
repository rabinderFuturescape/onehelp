import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TicketSchema, TicketInput, Ticket, Member, PRIORITY_OPTIONS, STATUS_OPTIONS } from '@/types/tickets';
import { Button } from '@/components/ui/Button';
import { useHelpTopics } from '@/hooks/useHelpTopics';
import { useRoles } from '@/hooks/useRoles';
import { MemberSearchDialog } from '@/components/complaints/MemberSearchDialog';
import dynamic from 'next/dynamic';
import { PaperClipIcon, UserIcon } from '@heroicons/react/24/outline';
import { 
  FormLayout, 
  FormSection, 
  FormField, 
  FormGrid,
  Input,
  Select,
  TextArea
} from '@/components/shared';

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

/**
 * Enhanced ticket form component using the new shared components
 * for consistent styling across the application.
 */
export const EnhancedTicketForm: React.FC<TicketFormProps> = ({
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

  const handleFormSubmit = (data: TicketInput) => {
    onSubmit(data);
  };

  return (
    <FormLayout
      onSubmit={handleSubmit(handleFormSubmit)}
      onCancel={onClose}
      isSubmitting={isSubmitting}
      submitLabel={initialData ? 'Update Ticket' : 'Create Ticket'}
    >
      <FormSection title="Member Information" description="Select or search for a member">
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
                    <div className="text-sm text-gray-500">
                      Unit: {selectedMember.unitNumber}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-500">No member selected</div>
          )}
          <Button
            type="button"
            onClick={() => setIsMemberSearchOpen(true)}
            variant="outline"
            size="sm"
          >
            {selectedMember ? 'Change Member' : 'Select Member'}
          </Button>
        </div>
      </FormSection>

      <FormSection title="Ticket Details">
        <FormGrid columns={2} gap="md">
          <FormField
            label="Help Topic"
            htmlFor="helpTopicId"
            error={errors.helpTopicId?.message}
            required
          >
            <Select
              id="helpTopicId"
              {...register('helpTopicId')}
              disabled={isLoadingHelpTopics}
              options={
                helpTopics?.map((topic) => ({
                  value: topic.id,
                  label: topic.name,
                })) || []
              }
              fullWidth
            />
          </FormField>

          <FormField
            label="Subject"
            htmlFor="subject"
            error={errors.subject?.message}
            required
          >
            <Input
              id="subject"
              {...register('subject')}
              fullWidth
            />
          </FormField>
        </FormGrid>

        <FormField
          label="Description"
          htmlFor="description"
          error={errors.description?.message}
          required
          className="mt-4"
        >
          <RichTextEditor
            control={control}
            name="description"
            error={errors.description?.message}
          />
        </FormField>

        <FormGrid columns={3} gap="md" className="mt-4">
          <FormField
            label="Priority"
            htmlFor="priority"
            error={errors.priority?.message}
          >
            <Select
              id="priority"
              {...register('priority')}
              options={PRIORITY_OPTIONS.map(option => ({
                value: option.value,
                label: option.label
              }))}
              fullWidth
            />
          </FormField>

          <FormField
            label="Status"
            htmlFor="status"
            error={errors.status?.message}
          >
            <Select
              id="status"
              {...register('status')}
              options={STATUS_OPTIONS.map(option => ({
                value: option.value,
                label: option.label
              }))}
              fullWidth
            />
          </FormField>

          <FormField
            label="Assigned To"
            htmlFor="assignedToId"
            error={errors.assignedToId?.message}
          >
            <Select
              id="assignedToId"
              {...register('assignedToId')}
              disabled={isLoadingRoles}
              options={[
                { value: '', label: 'Unassigned' },
                ...(roles?.map((role) => ({
                  value: role.id,
                  label: role.name,
                })) || []),
              ]}
              fullWidth
            />
          </FormField>
        </FormGrid>
      </FormSection>

      <FormSection title="Attachments" description="Upload files related to this ticket">
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

      <MemberSearchDialog
        isOpen={isMemberSearchOpen}
        onClose={() => setIsMemberSearchOpen(false)}
        onSelectMember={handleSelectMember}
      />
    </FormLayout>
  );
};
