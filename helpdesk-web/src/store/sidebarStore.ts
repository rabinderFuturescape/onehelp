import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SidebarState {
  isExpanded: boolean;
  toggleSidebar: () => void;
  expandSidebar: () => void;
  collapseSidebar: () => void;
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      isExpanded: true,
      toggleSidebar: () => set((state) => ({ isExpanded: !state.isExpanded })),
      expandSidebar: () => set({ isExpanded: true }),
      collapseSidebar: () => set({ isExpanded: false }),
    }),
    {
      name: 'sidebar-storage',
    }
  )
);
