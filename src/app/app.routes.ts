import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'matches',
    pathMatch: 'full',
  },
  {
    path: 'matches',
    loadComponent: () =>
      import('./features/matches/match-list/match-list').then((m) => m.MatchList),
    title: 'My Matches',
  },
  {
    path: 'matches/new',
    loadComponent: () =>
      import('./features/matches/match-form/match-form').then((m) => m.MatchForm),
    title: 'New Match',
  },
  {
    path: 'matches/:id/edit',
    loadComponent: () =>
      import('./features/matches/match-form/match-form').then((m) => m.MatchForm),
    title: 'Edit Match',
  },
];
