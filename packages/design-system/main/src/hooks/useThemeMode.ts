import { useCallback, useEffect, useState } from 'react';

/**
 * Theme mode values matching accessibility preferences
 */
export type ThemeMode = 'light' | 'dark' | 'high-contrast';

/**
 * System preference detected from media queries
 * null if autoDetect is disabled
 */
export type SystemPreference = ThemeMode | null;

/**
 * Configuration options for useThemeMode hook
 */
export type UseThemeModeOptions = {
  /**
   * Initial mode to use
   * @default 'light'
   */
  defaultMode?: ThemeMode;

  /**
   * Enable automatic detection from system preferences
   * Uses prefers-color-scheme and prefers-contrast media queries
   * @default true
   */
  autoDetect?: boolean;

  /**
   * localStorage key for persistence
   * @default 'lufa-theme-mode'
   */
  storageKey?: string;

  /**
   * Enable localStorage persistence
   * @default true
   */
  enableStorage?: boolean;
};

/**
 * Return value from useThemeMode hook
 */
export type UseThemeModeReturn = {
  /**
   * Current active mode
   */
  mode: ThemeMode;

  /**
   * Update the current mode
   * Persists to localStorage if enableStorage is true
   * Updates data-mode attribute on <html>
   */
  setMode: (mode: ThemeMode) => void;

  /**
   * Whether system prefers dark color scheme
   * Based on prefers-color-scheme: dark media query
   */
  systemPrefersDark: boolean;

  /**
   * Whether system prefers high contrast
   * Based on prefers-contrast: more media query
   */
  systemPrefersContrast: boolean;

  /**
   * Detected system preference (null if autoDetect disabled)
   * Priority: high-contrast > dark > light
   */
  systemPreference: SystemPreference;
};

/**
 * Type guard for ThemeMode
 */
function isValidMode(value: unknown): value is ThemeMode {
  return typeof value === 'string' && ['light', 'dark', 'high-contrast'].includes(value);
}

/**
 * Hook for managing accessibility color modes (light/dark/high-contrast)
 *
 * @example
 * ```typescript
 * function App() {
 *   const { mode, setMode } = useThemeMode();
 *
 *   return (
 *     <button onClick={() => setMode('dark')}>
 *       Switch to Dark Mode
 *     </button>
 *   );
 * }
 * ```
 *
 * @example With options
 * ```typescript
 * const { mode, setMode, systemPreference } = useThemeMode({
 *   defaultMode: 'light',
 *   autoDetect: true,
 *   storageKey: 'my-app-theme-mode',
 *   enableStorage: true,
 * });
 * ```
 */
export function useThemeMode(options?: UseThemeModeOptions): UseThemeModeReturn {
  const {
    defaultMode = 'light',
    autoDetect = true,
    storageKey = 'lufa-theme-mode',
    enableStorage = true,
  } = options ?? {};

  /**
   * Determine initial mode on mount
   */
  function getInitialMode(): ThemeMode {
    // SSR safety - always return default on server
    if (typeof window === 'undefined') {
      return defaultMode;
    }

    // Check localStorage first (explicit user preference)
    if (enableStorage) {
      const stored = localStorage.getItem(storageKey);
      if (stored && isValidMode(stored)) {
        return stored;
      }
    }

    // Auto-detect from system preferences
    if (autoDetect) {
      // Priority 1: High contrast
      if (window.matchMedia('(prefers-contrast: more)').matches) {
        return 'high-contrast';
      }
      // Priority 2: Dark mode
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
      // Priority 3: Light mode (default)
      return 'light';
    }

    // Fallback to default
    return defaultMode;
  }

  // Initialize mode state
  const [mode, setModeState] = useState<ThemeMode>(() => getInitialMode());

  // System preference state
  const [systemPrefersDark, setSystemPrefersDark] = useState(false);
  const [systemPrefersContrast, setSystemPrefersContrast] = useState(false);

  /**
   * Listen to system preference changes
   */
  useEffect(() => {
    if (typeof window === 'undefined' || !autoDetect) return;

    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const contrastQuery = window.matchMedia('(prefers-contrast: more)');

    const updateDark = (e: MediaQueryListEvent | MediaQueryList) => {
      setSystemPrefersDark(e.matches);
    };

    const updateContrast = (e: MediaQueryListEvent | MediaQueryList) => {
      setSystemPrefersContrast(e.matches);
    };

    // Set initial values
    updateDark(darkQuery);
    updateContrast(contrastQuery);

    // Listen for changes
    darkQuery.addEventListener('change', updateDark);
    contrastQuery.addEventListener('change', updateContrast);

    return () => {
      darkQuery.removeEventListener('change', updateDark);
      contrastQuery.removeEventListener('change', updateContrast);
    };
  }, [autoDetect]);

  /**
   * Sync mode to HTML attribute
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    document.documentElement.setAttribute('data-mode', mode);
  }, [mode]);

  /**
   * Persist mode to localStorage
   */
  useEffect(() => {
    if (!enableStorage || typeof window === 'undefined') return;
    localStorage.setItem(storageKey, mode);
  }, [mode, storageKey, enableStorage]);

  /**
   * Public API to change mode
   */
  const setMode = useCallback((newMode: ThemeMode) => {
    if (!isValidMode(newMode)) {
      console.warn('[useThemeMode] Invalid mode:', newMode);
      return;
    }
    setModeState(newMode);
  }, []);

  /**
   * Compute system preference
   */
  const systemPreference: SystemPreference = autoDetect
    ? systemPrefersContrast
      ? 'high-contrast'
      : systemPrefersDark
        ? 'dark'
        : 'light'
    : null;

  return {
    mode,
    setMode,
    systemPrefersDark,
    systemPrefersContrast,
    systemPreference,
  };
}
