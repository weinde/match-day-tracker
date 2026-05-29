import { Injectable, signal } from '@angular/core';
import { IMatch } from '../models/match.model';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  private readonly STORAGE_KEY = 'matches';
  private readonly _matches = signal<IMatch[]>(this.load());

  readonly matches = this._matches.asReadonly();

  add(match: Omit<IMatch, 'id'>): IMatch {
    const newMatch: IMatch = { ...match, id: crypto.randomUUID() };
    this._matches.update((list) => [...list, newMatch]);
    this.persist();
    return newMatch;
  }

  update(id: string, changes: Partial<Omit<IMatch, 'id'>>): void {
    this._matches.update((list) => list.map((m) => (m.id === id ? { ...m, ...changes } : m)));
    this.persist();
  }

  delete(id: string): void {
    this._matches.update((list) => list.filter((m) => m.id !== id));
    this.persist();
  }

  getById(id: string): IMatch | undefined {
    return this._matches().find((m) => m.id === id);
  }

  private load(): IMatch[] {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      return raw ? (JSON.parse(raw) as IMatch[]) : [];
    } catch {
      return [];
    }
  }

  private persist(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._matches()));
  }
}
