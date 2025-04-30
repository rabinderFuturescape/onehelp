#!/bin/bash

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
# Get the project root directory (one level up from scripts directory)
PROJECT_DIR="$( cd "$SCRIPT_DIR/.." && pwd )"

# Copy mock hooks to replace real hooks
cp "$PROJECT_DIR/src/hooks/useHelpTopics.mock.ts" "$PROJECT_DIR/src/hooks/useHelpTopics.ts"
cp "$PROJECT_DIR/src/hooks/useCannedResponses.mock.ts" "$PROJECT_DIR/src/hooks/useCannedResponses.ts"
cp "$PROJECT_DIR/src/hooks/useComplaints.mock.ts" "$PROJECT_DIR/src/hooks/useComplaints.ts"
cp "$PROJECT_DIR/src/hooks/useEscalationRules.mock.ts" "$PROJECT_DIR/src/hooks/useEscalationRules.ts"
cp "$PROJECT_DIR/src/hooks/useReports.mock.ts" "$PROJECT_DIR/src/hooks/useReports.ts"
cp "$PROJECT_DIR/src/hooks/useRoles.mock.ts" "$PROJECT_DIR/src/hooks/useRoles.ts"
cp "$PROJECT_DIR/src/hooks/useTickets.mock.ts" "$PROJECT_DIR/src/hooks/useTickets.ts"

# Copy mock auth store
cp "$PROJECT_DIR/src/store/mockAuthStore.ts" "$PROJECT_DIR/src/store/authStore.ts"

# Copy mock providers
cp "$PROJECT_DIR/src/app/providers.mock.tsx" "$PROJECT_DIR/src/app/providers.tsx"

# Start the development server
cd "$PROJECT_DIR" && npm run dev
