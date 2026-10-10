import { StrictMode, useCallback, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';
import { useLiteMode } from './hooks/useLiteMode';
import { PageLoader } from './components/layout/PageLoader';
import { createAppRouter } from './app/router';
import { AppStateContext } from './app/context';
import './styles/tokens.css';
import './styles/globals.css';

function Root() {
  const { theme, toggle: toggleTheme } = useTheme();
  const { lite, toggle: toggleLite } = useLiteMode();
  const [sceneReady, setSceneReady] = useState(false);
  const onSceneReady = useCallback(() => setSceneReady(true), []);

  /* one router per session — toggles flow through context, nothing remounts */
  const router = useMemo(() => createAppRouter(), []);

  return (
    <AppStateContext.Provider value={{ theme, onThemeToggle: toggleTheme, lite, onLiteToggle: toggleLite, onSceneReady }}>
      <PageLoader sceneReady={sceneReady} />
      <RouterProvider router={router} />
    </AppStateContext.Provider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
