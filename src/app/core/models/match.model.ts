import { Weather } from './weather.model';

export interface IMatch {
  id: string;
  date: string;
  homeTeam: string;
  awayTeam: string;
  venue: string;
  shotsCount: number;
  bestPhotoUrls: string[];
  weather: Weather;
  notes?: string;
}
