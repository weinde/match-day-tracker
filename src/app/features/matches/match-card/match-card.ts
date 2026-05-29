import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

import { IMatch } from '../../../core/models/match.model';

@Component({
  selector: 'app-match-card',
  imports: [RouterLink],
  templateUrl: './match-card.html',
  styleUrl: './match-card.scss',
})
export class MatchCard {
  match = input.required<IMatch>();
  delete = output<IMatch>();
}
