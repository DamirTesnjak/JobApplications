import { RenderMode, ServerRoute } from '@angular/ssr';
import { CandidateProfileLayout } from './pages/candidateProfile/candidateProfileLayout/candidateProfileLayout';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
