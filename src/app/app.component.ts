import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, Subscriber, Subscription, tap } from 'rxjs';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class AppComponent implements OnInit, OnDestroy {

  private activeThemeSub = Subscription.EMPTY;

  constructor(protected themeService: ThemeService) {}

  ngOnInit(): void {
    const theme = localStorage.getItem('theme');
    if (theme && this.themeService.themeNames.includes(theme)) {
      this.themeService.set(theme);
    } else {
      this.themeService.set('light');
    }
  
    this.activeThemeSub = this.themeService.activeTheme$.pipe(filter(Boolean)).subscribe(themeName => localStorage.setItem('theme', themeName));
  }

  ngOnDestroy(): void {
      this.activeThemeSub.unsubscribe();
  }
}
