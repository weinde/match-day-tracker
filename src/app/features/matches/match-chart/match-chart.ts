import { Component, computed, input } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import { IMatch } from '../../../core/models/match.model';

@Component({
  selector: 'app-match-chart',
  imports: [BaseChartDirective],
  templateUrl: './match-chart.html',
  styleUrl: './match-chart.scss',
})
export class MatchChart {
  matches = input.required<IMatch[]>();

  chartData = computed<ChartData<'bar'>>(() => {
    const sorted = [...this.matches()].sort((a, b) => a.date.localeCompare(b.date));

    return {
      labels: sorted.map((m) => m.date),
      datasets: [
        {
          label: 'Shots taken',
          data: sorted.map((m) => m.shotsCount),
          backgroundColor: 'rgba(13, 110, 253, 0.6)',
          borderColor: 'rgba(13, 110, 253, 1)',
          borderWidth: 1,
        },
      ],
    };
  });

  readonly chartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          title: (items) => items[0]?.label ?? '',
          label: (item) => `${item.parsed.y} shots`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { precision: 0 },
        title: { display: true, text: 'Shots' },
      },
      x: {
        title: { display: true, text: 'Match date' },
      },
    },
  };
}
