#!/bin/bash

# Copy mock hooks to replace real hooks
cp /Users/rabindersharma/Development/Projects/Helpdesk_app/helpdesk-web/src/hooks/useHelpTopics.mock.ts /Users/rabindersharma/Development/Projects/Helpdesk_app/helpdesk-web/src/hooks/useHelpTopics.ts
cp /Users/rabindersharma/Development/Projects/Helpdesk_app/helpdesk-web/src/hooks/useCannedResponses.mock.ts /Users/rabindersharma/Development/Projects/Helpdesk_app/helpdesk-web/src/hooks/useCannedResponses.ts
cp /Users/rabindersharma/Development/Projects/Helpdesk_app/helpdesk-web/src/hooks/useComplaints.mock.ts /Users/rabindersharma/Development/Projects/Helpdesk_app/helpdesk-web/src/hooks/useComplaints.ts
cp /Users/rabindersharma/Development/Projects/Helpdesk_app/helpdesk-web/src/hooks/useEscalationRules.mock.ts /Users/rabindersharma/Development/Projects/Helpdesk_app/helpdesk-web/src/hooks/useEscalationRules.ts
cp /Users/rabindersharma/Development/Projects/Helpdesk_app/helpdesk-web/src/hooks/useReports.mock.ts /Users/rabindersharma/Development/Projects/Helpdesk_app/helpdesk-web/src/hooks/useReports.ts
cp /Users/rabindersharma/Development/Projects/Helpdesk_app/helpdesk-web/src/hooks/useRoles.mock.ts /Users/rabindersharma/Development/Projects/Helpdesk_app/helpdesk-web/src/hooks/useRoles.ts
cp /Users/rabindersharma/Development/Projects/Helpdesk_app/helpdesk-web/src/hooks/useTickets.mock.ts /Users/rabindersharma/Development/Projects/Helpdesk_app/helpdesk-web/src/hooks/useTickets.ts

# Copy mock auth store
cp /Users/rabindersharma/Development/Projects/Helpdesk_app/helpdesk-web/src/store/mockAuthStore.ts /Users/rabindersharma/Development/Projects/Helpdesk_app/helpdesk-web/src/store/authStore.ts

# Copy mock providers
cp /Users/rabindersharma/Development/Projects/Helpdesk_app/helpdesk-web/src/app/providers.mock.tsx /Users/rabindersharma/Development/Projects/Helpdesk_app/helpdesk-web/src/app/providers.tsx

# Start the development server
cd /Users/rabindersharma/Development/Projects/Helpdesk_app/helpdesk-web && npm run dev
