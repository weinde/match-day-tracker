export const WEATHER_OPTIONS = [
  'sunny',
  'cloudy',
  'rainy',
  'snowy',
  'stormy',
  'windy',
  'fog',
  'mixed',
] as const;

export type Weather = (typeof WEATHER_OPTIONS)[number];
