import { createContext, useContext } from 'react';

export interface AppState {
  theme: 'dark' | 'light';
  onThemeToggle: () => void;
  lite: boolean;
  onLiteToggle: () => void;
  onSceneReady: () => void;
}

export const AppStateContext = createContext<AppState | null>(null);

export function useAppState(): AppState {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState must be used inside <AppStateContext.Provider>');
  return ctx;
}
