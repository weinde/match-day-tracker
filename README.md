# Match Day Tracker

A personal dashboard for football photographers to log the matches they've shot — teams, venue, weather, shot count, and links to favourite frames. Built as my first real Angular app.

![Angular](https://img.shields.io/badge/Angular-20-DD0031?logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3?logo=bootstrap&logoColor=white)

## Features

- Log matches with date, teams, venue, shot count, weather, photo URLs, and notes
- Edit and delete existing entries
- Visualise shots over time with a bar chart
- Data persists locally — no backend, no signup, your data stays in your browser
- Responsive layout, mobile-first

## Tech stack

- **Angular 20** with standalone components and the new control flow (`@if`, `@for`)
- **Signals** for reactive state — no NgRx, no RxJS subscriptions
- **Reactive Forms** with typed `FormGroup`, `FormArray`, and `nonNullable` builders
- **Chart.js** via `ng2-charts` for the visualisation
- **Bootstrap 5** for layout primitives, with custom SCSS overrides
- **Vitest + jsdom** for unit testing the service layer
- **LocalStorage** for persistence

## Getting started

Prerequisites: Node.js 20+ and npm.

```bash
