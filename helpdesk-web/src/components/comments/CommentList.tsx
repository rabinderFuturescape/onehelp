'use client';

import React, { useState } from 'react';
import { Comment, CommentInput } from '@/types/comments';
import { CommentItem } from './CommentItem';
import { CommentForm } from './CommentForm';
import { useTicketComments, useCreateComment, useUpdateComment, useDeleteComment } from '@/hooks/useComments.mock';
import { DeleteConfirmationDialog } from '@/components/shared/DeleteConfirmationDialog';
import { useAuthStore } from '@/store/authStore';

interface CommentListProps {
  ticketId: string;
}

export const CommentList: React.FC<CommentListProps> = ({ ticketId }) => {
  const { user } = useAuthStore();
  const { data: comments = [], isLoading, error } = useTicketComments(ticketId);
  const createCommentMutation = useCreateComment();
  const updateCommentMutation = useUpdateComment();
  const deleteCommentMutation = useDeleteComment();

  // State for editing and deleting
  const [editingComment, setEditingComment] = useState<Comment | null>(null);
  const [commentToDelete, setCommentToDelete] = useState<Comment | null>(null);
  const [showInternalNotes, setShowInternalNotes] = useState(true);

  // Handle comment creation
  const handleCreateComment = (data: CommentInput) => {
    createCommentMutation.mutate(
      { ticketId, comment: data },
      {
        onSuccess: () => {
          // Reset form or show success message
        },
      }
    );
  };

  // Handle comment update
  const handleUpdateComment = (data: CommentInput) => {
    if (editingComment) {
      updateCommentMutation.mutate(
        {
          id: editingComment.id,
          ticketId,
          comment: data,
        },
        {
          onSuccess: () => {
            setEditingComment(null);
          },
        }
      );
    }
  };

  // Handle comment deletion
  const handleDeleteComment = () => {
    if (commentToDelete) {
      deleteCommentMutation.mutate(
        {
          id: commentToDelete.id,
          ticketId,
        },
        {
          onSuccess: () => {
            setCommentToDelete(null);
          },
        }
      );
    }
  };

  // Filter comments based on internal status
  const filteredComments = comments.filter(
    (comment) => showInternalNotes || !comment.isInternal
  );

  // Check if user can see internal notes
  const canSeeInternalNotes = user?.role === 'admin' || user?.role === 'agent' || user?.role === 'manager';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Comments</h3>

        {canSeeInternalNotes && (
          <div className="flex items-center">
            <input
              id="show-internal"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              checked={showInternalNotes}
              onChange={(e) => setShowInternalNotes(e.target.checked)}
            />
            <label
              htmlFor="show-internal"
              className="ml-2 text-sm text-gray-600"
            >
              Show internal notes
            </label>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="text-center py-4">
          <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-2 text-sm text-gray-500">Loading comments...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-700">
          Error loading comments: {error.message}
        </div>
      ) : filteredComments.length === 0 ? (
        <div className="text-center py-4 text-gray-500">
          No comments yet. Be the first to add a comment.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredComments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onEdit={setEditingComment}
              onDelete={setCommentToDelete}
            />
          ))}
        </div>
      )}

      {editingComment ? (
        <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h4 className="text-sm font-medium text-gray-900 mb-4">Edit Comment</h4>
          <CommentForm
            ticketId={ticketId}
            initialData={editingComment}
            onSubmit={handleUpdateComment}
            isSubmitting={updateCommentMutation.isPending}
            onCancel={() => setEditingComment(null)}
          />
        </div>
      ) : (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-900 mb-4">Add a Comment</h4>
          <CommentForm
            ticketId={ticketId}
            onSubmit={handleCreateComment}
            isSubmitting={createCommentMutation.isPending}
          />
        </div>
      )}

      <DeleteConfirmationDialog
        isOpen={!!commentToDelete}
        onClose={() => setCommentToDelete(null)}
        onConfirm={handleDeleteComment}
        title="Delete Comment"
        description="Are you sure you want to delete this comment? This action cannot be undone."
        isDeleting={deleteCommentMutation.isPending}
      />
    </div>
  );
};
