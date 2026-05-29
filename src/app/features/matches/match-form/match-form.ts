import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatchService } from '../../../core/services/match-service';
import { Weather, WEATHER_OPTIONS } from '../../../core/models/weather.model';

@Component({
  selector: 'app-match-form',
  imports: [ReactiveFormsModule],
  templateUrl: './match-form.html',
  styleUrl: './match-form.scss',
})
export class MatchForm implements OnInit {
  @Input() id?: string;

  private fb = inject(FormBuilder);
  private matchService = inject(MatchService);
  private router = inject(Router);

  readonly weatherOptions = WEATHER_OPTIONS;

  form = this.fb.nonNullable.group({
    date: ['', Validators.required],
    homeTeam: ['', [Validators.required, Validators.minLength(2)]],
    awayTeam: ['', [Validators.required, Validators.minLength(2)]],
    venue: ['', Validators.required],
    shotsCount: [0, [Validators.required, Validators.min(0)]],
    weather: ['sunny' as Weather, Validators.required],
    notes: [''],
    bestPhotoUrls: this.fb.nonNullable.array<string>([]),
  });

  get photoUrls(): FormArray {
    return this.form.controls.bestPhotoUrls;
  }

  get isEditing(): boolean {
    return this.id != null;
  }

  ngOnInit(): void {
    if (!this.id) return;

    const existing = this.matchService.getById(this.id);
    if (!existing) {
      this.router.navigate(['/matches']);
      return;
    }

    this.form.patchValue(existing);
    existing.bestPhotoUrls.forEach((url) => this.addPhotoUrl(url));
  }

  addPhotoUrl(initial = ''): void {
    this.photoUrls.push(this.fb.nonNullable.control(initial, Validators.required));
  }

  removePhotoUrl(index: number): void {
    this.photoUrls.removeAt(index);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    if (this.isEditing && this.id) {
      this.matchService.update(this.id, value);
    } else {
      this.matchService.add(value);
    }

    this.router.navigate(['/matches']);
  }

  onCancel(): void {
    this.router.navigate(['/matches']);
  }
}
