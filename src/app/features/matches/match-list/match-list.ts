import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatchService } from '../../../core/services/match-service';
import { IMatch } from '../../../core/models/match.model';
import { MatchCard} from '../match-card/match-card';
import { MatchChart } from '../match-chart/match-chart';

@Component({
  selector: 'app-match-list',
  imports: [RouterLink, MatchCard, MatchChart],
  templateUrl: './match-list.html',
  styleUrl: './match-list.scss',
})
export class MatchList {
  private matchService = inject(MatchService);

  matches = this.matchService.matches;

  onDelete(match: IMatch): void {
    const label = `${match.homeTeam} vs ${match.awayTeam}`;
    if (confirm(`Delete the match "${label}"? This can't be undone.`)) {
      this.matchService.delete(match.id);
    }
  }
}
