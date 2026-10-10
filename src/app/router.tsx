import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { App } from './App';
import { HomePage } from '../pages/HomePage';

/* the case study is code-split — it only loads when visited */
const AgriDetectCaseStudy = lazy(() =>
  import('../pages/AgriDetectCaseStudy').then((m) => ({ default: m.AgriDetectCaseStudy }))
);
const NotFoundPage = lazy(() => import('../pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

/** Built once per session — live settings flow through AppStateContext. */
export function createAppRouter() {
  return createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: 'projects/agri-detect',
          element: (
            <Suspense fallback={<div className="min-h-[70vh] grid place-items-center text-muted pt-32">Loading case study…</div>}>
              <AgriDetectCaseStudy />
            </Suspense>
          ),
        },
        {
          path: '404',
          element: (
            <Suspense fallback={null}>
              <NotFoundPage />
            </Suspense>
          ),
        },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
  ]);
}
