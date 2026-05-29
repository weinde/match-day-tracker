import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

import { IMatch } from '../../../core/models/match.model';
import { WeatherIconPipe } from '../../../shared/pipes/weather-icon-pipe';

@Component({
  selector: 'app-match-card',
  imports: [RouterLink, WeatherIconPipe],
  templateUrl: './match-card.html',
  styleUrl: './match-card.scss',
})
export class MatchCard {
  match = input.required<IMatch>();
  delete = output<IMatch>();
}
