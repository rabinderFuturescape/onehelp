// Theme configuration for the Helpdesk application
// This centralizes colors, spacing, and other design tokens

export const colors = {
  // Primary colors - based on OneApp red
  primary: {
    50: '#fff5f5',
    100: '#ffe0e0',
    200: '#ffc7c7',
    300: '#ffa3a3',
    400: '#ff7a7a',
    500: '#ff5252',
    600: '#ff0000', // Main brand red
    700: '#df0817', // Darker brand red
    800: '#c00000',
    900: '#a50000',
    950: '#7a0000',
  },

  // Gray scale
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#221f1f', // Brand black
    900: '#111827',
    950: '#030712',
  },

  // Brand colors from OneApp palette
  brand: {
    sidebar: '#221f1f',  // Brand black
    accent: '#df0817',   // Brand red
    secondary: '#feae3d', // Brand orange/yellow
    highlight: '#e31836', // Brand pink/coral
    blue: '#2460a6',      // Brand blue
  },

  // Status colors
  status: {
    success: '#10b981', // Green
    warning: '#feae3d', // Brand orange
    error: '#df0817',   // Brand red
    info: '#2460a6',    // Brand blue
    open: '#fff5f5',    // Light red
    high: '#fff8e6',    // Light orange
  },

  // Priority colors
  priority: {
    low: '#10b981',     // Green
    medium: '#feae3d',  // Brand orange
    high: '#e31836',    // Brand pink/coral
    urgent: '#df0817',  // Brand red
  }
};

export const spacing = {
  0: '0px',
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  2.5: '0.625rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  11: '2.75rem',
  12: '3rem',
  14: '3.5rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  28: '7rem',
  32: '8rem',
  36: '9rem',
  40: '10rem',
  44: '11rem',
  48: '12rem',
  52: '13rem',
  56: '14rem',
  60: '15rem',
  64: '16rem',
  72: '18rem',
  80: '20rem',
  96: '24rem',
};

export const breakpoints = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export const fontSizes = {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
  '5xl': '3rem',
  '6xl': '3.75rem',
  '7xl': '4.5rem',
  '8xl': '6rem',
  '9xl': '8rem',
};

export const fontWeights = {
  thin: 100,
  extralight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
};

export const borderRadius = {
  none: '0px',
  sm: '0.125rem',
  DEFAULT: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
};

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  none: 'none',
};

export const zIndices = {
  0: 0,
  10: 10,
  20: 20,
  30: 30,
  40: 40,
  50: 50,
  auto: 'auto',
};

// Sidebar specific constants
export const sidebar = {
  expandedWidth: '16rem', // 256px
  collapsedWidth: '4rem', // 64px
  zIndex: 1000, // Increased to ensure it's always on top
};

// Header specific constants
export const header = {
  height: '4rem',
  zIndex: 40,
};

// Export the entire theme
const theme = {
  colors,
  spacing,
  breakpoints,
  fontSizes,
  fontWeights,
  borderRadius,
  shadows,
  zIndices,
  sidebar,
  header,
};

export default theme;
