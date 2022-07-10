import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class AppComponent implements OnInit {

  constructor(protected themeService: ThemeService) {}

  ngOnInit(): void {
    const theme = localStorage.getItem('theme');
    this.themeService.set(theme || 'light');

    this.themeService.activeTheme$.pipe(tap(console.log)).subscribe(themeName => localStorage.setItem('theme', themeName));
  }
}
