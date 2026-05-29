import { Pipe, PipeTransform } from '@angular/core';
import { Weather } from '../../core/models/weather.model';

const WEATHER_EMOJI: Record<Weather, string> = {
  sunny: '☀️',
  cloudy: '☁️',
  rainy: '🌧️',
  snowy: '❄️',
  stormy: '⛈️',
  windy: '💨',
  fog: '🌫️',
  mixed: '🌤️',
};

@Pipe({
  name: 'weatherIcon',
})
export class WeatherIconPipe implements PipeTransform {
  transform(weather: Weather): string {
    return WEATHER_EMOJI[weather];
  }
}
