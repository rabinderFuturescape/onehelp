import React from 'react';
import { ReportResponse } from '@/types/reports';

interface ReportSummaryProps {
  report: ReportResponse;
}

export const ReportSummary: React.FC<ReportSummaryProps> = ({ report }) => {
  const { summary } = report;

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
      <div className="p-4 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Summary</h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-blue-500 text-sm font-medium">Total</div>
            <div className="text-2xl font-bold text-blue-700">{summary.total}</div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4">
            <div className="text-yellow-500 text-sm font-medium">Open</div>
            <div className="text-2xl font-bold text-yellow-700">{summary.open}</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="text-orange-500 text-sm font-medium">In Progress</div>
            <div className="text-2xl font-bold text-orange-700">{summary.inProgress}</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-green-500 text-sm font-medium">Resolved</div>
            <div className="text-2xl font-bold text-green-700">{summary.resolved}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-gray-500 text-sm font-medium">Closed</div>
            <div className="text-2xl font-bold text-gray-700">{summary.closed}</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="text-purple-500 text-sm font-medium">Reopened</div>
            <div className="text-2xl font-bold text-purple-700">{summary.reopened}</div>
          </div>
          <div className="bg-red-50 rounded-lg p-4">
            <div className="text-red-500 text-sm font-medium">Overdue</div>
            <div className="text-2xl font-bold text-red-700">{summary.overdue}</div>
          </div>
          <div className="bg-indigo-50 rounded-lg p-4">
            <div className="text-indigo-500 text-sm font-medium">Escalated</div>
            <div className="text-2xl font-bold text-indigo-700">{summary.escalated}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
