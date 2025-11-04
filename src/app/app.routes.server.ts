import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'candidateProfile/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'candidateProfile/:id/editCandidate',
    renderMode: RenderMode.Client
  },
  {
    path: 'hrUserProfile/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'hrUserProfile/:id/editHrUserProfile',
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
