# Shared Components

This directory contains reusable components that are shared across different modules of the application. These components are designed to reduce code duplication and ensure consistency throughout the UI.

## Components

### DeleteConfirmationDialog

A reusable dialog for confirming deletion actions.

```tsx
import { DeleteConfirmationDialog } from '@/components/shared/DeleteConfirmationDialog';

// Usage
<DeleteConfirmationDialog
  isOpen={isDeleteDialogOpen}
  onClose={() => setIsDeleteDialogOpen(false)}
  onConfirm={handleDelete}
  title="Delete Item"
  description="Are you sure you want to delete this item? This action cannot be undone."
  isDeleting={isDeleting}
/>
```

#### Props

| Prop | Type | Description |
|------|------|-------------|
| isOpen | boolean | Controls whether the dialog is visible |
| onClose | () => void | Function called when the dialog is closed |
| onConfirm | () => void | Function called when the delete action is confirmed |
| title | string | Title of the dialog |
| description | string | Description text explaining the action |
| isDeleting | boolean | Whether the delete action is in progress |

### DataTable

A flexible and reusable table component that can be used to display any type of data.

```tsx
import { DataTable, Column } from '@/components/shared/DataTable';

// Define columns
const columns: Column<YourDataType>[] = [
  {
    key: 'id',
    header: 'ID',
    render: (item) => item.id,
  },
  {
    key: 'name',
    header: 'Name',
    render: (item) => item.name,
  },
  // Add more columns as needed
];

// Usage
<DataTable
  items={yourDataArray}
  columns={columns}
  onView={handleView}
  onEdit={handleEdit}
  onDelete={handleDelete}
  getRowClassName={(item) => item.isSpecial ? 'bg-yellow-50' : ''}
  keyExtractor={(item) => item.id}
/>
```

#### Props

| Prop | Type | Description |
|------|------|-------------|
| items | T[] | Array of data items to display |
| columns | Column<T>[] | Array of column definitions |
| onView | (item: T) => void | Optional function called when the view action is clicked |
| onEdit | (item: T) => void | Optional function called when the edit action is clicked |
| onDelete | (item: T) => void | Optional function called when the delete action is clicked |
| getRowClassName | (item: T) => string | Optional function to determine the CSS class for each row |
| keyExtractor | (item: T, index: number) => string \| number | Optional function to extract a unique key for each row |
| actionButtons | { view?: boolean, edit?: boolean, delete?: boolean } | Optional object to control which action buttons are displayed |

#### Column Definition

| Prop | Type | Description |
|------|------|-------------|
| key | string | Unique identifier for the column |
| header | string | Header text for the column |
| className | string | Optional CSS class for the column |
| render | (item: T) => React.ReactNode | Function to render the cell content |

### FilterPanel

A configurable filter panel that can be used to filter data in various ways.

```tsx
import { FilterPanel, FilterOption } from '@/components/shared/FilterPanel';

// Define filter options
const filterOptions: FilterOption[] = [
  {
    id: 'name',
    name: 'name',
    type: 'text',
    label: 'Name',
    placeholder: 'Enter name',
  },
  {
    id: 'status',
    name: 'status',
    type: 'select',
    label: 'Status',
    options: [
      { value: '', label: 'All Statuses' },
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
    ],
  },
  // Add more filter options as needed
];

// Usage
<FilterPanel
  filters={filters}
  onFilterChange={handleFilterChange}
  filterOptions={filterOptions}
  title="Filter Items"
/>
```

#### Props

| Prop | Type | Description |
|------|------|-------------|
| filters | T | Current filter values |
| onFilterChange | (filters: T) => void | Function called when filters are applied |
| filterOptions | FilterOption[] | Array of filter option definitions |
| initialExpanded | boolean | Optional flag to control whether the filter panel is initially expanded |
| title | string | Optional title for the filter panel |

#### FilterOption Definition

| Prop | Type | Description |
|------|------|-------------|
| id | string | Unique identifier for the filter |
| name | string | Name of the filter (usually same as id) |
| type | 'text' \| 'select' \| 'date' \| 'checkbox' | Type of the filter input |
| label | string | Label text for the filter |
| placeholder | string | Optional placeholder text for text inputs |
| options | { value: string, label: string }[] | Options for select inputs |
| gridSpan | 1 \| 2 \| 3 \| 4 | Optional grid span for the filter |

### MemberSearchDialog

A dialog for searching and selecting members.

```tsx
import { MemberSearchDialog } from '@/components/shared/MemberSearchDialog';

// Usage
<MemberSearchDialog
  isOpen={isMemberSearchOpen}
  onClose={() => setIsMemberSearchOpen(false)}
  onSelectMember={handleSelectMember}
/>
```

#### Props

| Prop | Type | Description |
|------|------|-------------|
| isOpen | boolean | Controls whether the dialog is visible |
| onClose | () => void | Function called when the dialog is closed |
| onSelectMember | (member: Member) => void | Function called when a member is selected |

### EntityForm

A configurable form component for creating and editing entities.

```tsx
import { EntityForm, FormSection } from '@/components/shared/EntityForm';
import { z } from 'zod';

// Define form schema
const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  status: z.enum(['active', 'inactive']),
});

// Define form sections
const sections: FormSection[] = [
  {
    title: 'Basic Information',
    fields: [
      {
        id: 'name',
        type: 'text',
        label: 'Name',
        required: true,
      },
      {
        id: 'description',
        type: 'richtext',
        label: 'Description',
        required: true,
      },
      {
        id: 'status',
        type: 'select',
        label: 'Status',
        options: [
          { value: 'active', label: 'Active' },
          { value: 'inactive', label: 'Inactive' },
        ],
      },
    ],
  },
];

// Usage
<EntityForm
  sections={sections}
  schema={schema}
  initialData={initialData}
  onSubmit={handleSubmit}
  isSubmitting={isSubmitting}
  submitLabel="Save"
/>
```

#### Props

| Prop | Type | Description |
|------|------|-------------|
| sections | FormSection[] | Array of form section definitions |
| schema | ZodSchema<any> | Zod schema for form validation |
| initialData | T | Optional initial data for the form |
| onSubmit | (data: T) => void | Function called when the form is submitted |
| isSubmitting | boolean | Whether the form submission is in progress |
| submitLabel | string | Optional label for the submit button |

#### FormSection Definition

| Prop | Type | Description |
|------|------|-------------|
| title | string | Title of the section |
| fields | FormField[] | Array of field definitions |

#### FormField Definition

| Prop | Type | Description |
|------|------|-------------|
| id | string | Unique identifier for the field |
| type | 'text' \| 'select' \| 'textarea' \| 'richtext' \| 'member' \| 'file' \| 'hidden' | Type of the field |
| label | string | Optional label for the field |
| placeholder | string | Optional placeholder text |
| options | { value: string, label: string }[] | Options for select fields |
| required | boolean | Whether the field is required |
| gridSpan | 1 \| 2 \| 3 | Optional grid span for the field |
| defaultValue | any | Optional default value for the field |

## Helper Functions

The DataTable component also exports several helper functions:

### getPriorityColor

Returns the appropriate CSS class for a priority level.

```tsx
import { getPriorityColor } from '@/components/shared/DataTable';

const className = getPriorityColor('high'); // Returns 'bg-orange-100 text-orange-800'
```

### getStatusColor

Returns the appropriate CSS class for a status.

```tsx
import { getStatusColor } from '@/components/shared/DataTable';

const className = getStatusColor('open'); // Returns 'bg-blue-100 text-blue-800'
```

### formatDate

Formats a date string or Date object into a human-readable format.

```tsx
import { formatDate } from '@/components/shared/DataTable';

const formattedDate = formatDate('2023-01-01'); // Returns 'Jan 1, 2023'
```

### getStatusLabel

Converts a status string into a human-readable label.

```tsx
import { getStatusLabel } from '@/components/shared/DataTable';

const label = getStatusLabel('in_progress'); // Returns 'In Progress'
```
