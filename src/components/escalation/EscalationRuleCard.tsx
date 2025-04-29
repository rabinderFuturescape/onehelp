import React from 'react';
import { EscalationRule } from '@/types/escalation';
import { Button } from '@/components/ui/Button';
import { ChevronDownIcon, ChevronUpIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface EscalationRuleCardProps {
  rule: EscalationRule;
  onEdit: (rule: EscalationRule) => void;
  onDelete: (rule: EscalationRule) => void;
}

export const EscalationRuleCard: React.FC<EscalationRuleCardProps> = ({
  rule,
  onEdit,
  onDelete,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-blue-100 text-blue-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'urgent':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h3 className="text-lg font-medium text-gray-900">{rule.name}</h3>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(
                rule.priority
              )}`}
            >
              {rule.priority.charAt(0).toUpperCase() + rule.priority.slice(1)}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(rule)}
              aria-label="Edit rule"
            >
              <PencilIcon className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(rule)}
              aria-label="Delete rule"
            >
              <TrashIcon className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleExpand}
              aria-label={isExpanded ? 'Collapse' : 'Expand'}
            >
              {isExpanded ? (
                <ChevronUpIcon className="h-5 w-5" />
              ) : (
                <ChevronDownIcon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        <div className="mt-2 text-sm text-gray-500">
          <p>{rule.description || 'No description provided.'}</p>
          <p className="mt-1">
            Time threshold: {rule.timeThresholdMinutes} minutes
          </p>
        </div>

        {isExpanded && (
          <div className="mt-4 border-t pt-4">
            <h4 className="text-sm font-medium text-gray-900">Escalation Tiers</h4>
            <ul className="mt-2 space-y-3">
              {rule.tiers.map((tier) => (
                <li
                  key={tier.id}
                  className="flex items-start p-3 bg-gray-50 rounded-md"
                  style={{ marginLeft: `${(tier.level - 1) * 1.5}rem` }}
                >
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-gray-900">
                      Tier {tier.level}
                    </div>
                    <div className="mt-1 text-sm text-gray-500">
                      <p>Assignee Role: {tier.assigneeRoleId}</p>
                      <p>SLA: {tier.slaHours} hours</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
