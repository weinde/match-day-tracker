import { TestBed } from '@angular/core/testing';
import { MatchService } from './match-service';
import { IMatch } from '../models/match.model';

describe('MatchService', () => {
  let service: MatchService;

  // Build a valid match payload (no id — service generates it)
  const samplePayload: Omit<IMatch, 'id'> = {
    date: '2026-05-29',
    homeTeam: 'Maribor',
    awayTeam: 'Olimpija',
    venue: 'Ljudski vrt',
    shotsCount: 240,
    bestPhotoUrls: [],
    weather: 'cloudy',
  };

  beforeEach(() => {
    localStorage.clear(); // each test starts with empty storage
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('starts with an empty list when localStorage is empty', () => {
    expect(service.matches()).toEqual([]);
  });

  describe('add', () => {
    it('adds a match and assigns an id', () => {
      const created = service.add(samplePayload);

      expect(created.id).toBeTruthy();
      expect(service.matches().length).toBe(1);
      expect(service.matches()[0]).toEqual(created);
    });

    it('persists the match to localStorage', () => {
      service.add(samplePayload);

      const raw = localStorage.getItem('matches');
      expect(raw).toBeTruthy();

      const parsed = JSON.parse(raw!) as IMatch[];
      expect(parsed.length).toBe(1);
      expect(parsed[0].homeTeam).toBe('Maribor');
    });

    it('does not mutate the input object', () => {
      const input = { ...samplePayload };
      service.add(input);

      expect(input).not.toHaveProperty('id');
    });
  });

  describe('update', () => {
    it('updates only the matching match', () => {
      const a = service.add(samplePayload);
      const b = service.add({ ...samplePayload, homeTeam: 'Celje' });

      service.update(a.id, { shotsCount: 999 });

      expect(service.getById(a.id)?.shotsCount).toBe(999);
      expect(service.getById(b.id)?.shotsCount).toBe(240);
    });

    it('is a no-op for an unknown id', () => {
      service.add(samplePayload);
      const before = service.matches();

      service.update('nonexistent-id', { shotsCount: 0 });

      expect(service.matches()).toEqual(before);
    });
  });

  describe('delete', () => {
    it('removes the matching match', () => {
      const a = service.add(samplePayload);
      const b = service.add({ ...samplePayload, homeTeam: 'Celje' });

      service.delete(a.id);

      expect(service.matches().length).toBe(1);
      expect(service.matches()[0].id).toBe(b.id);
    });
  });
});
