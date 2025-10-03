import { Component, HostListener } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  heroShoppingBag,
  heroUser,
  heroMagnifyingGlass,
} from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIconComponent, CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [provideIcons({ heroShoppingBag, heroUser, heroMagnifyingGlass })],
})
export class HeaderComponent {
  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    console.log('Scroll Y:', this.isScrolled);
    this.isScrolled = window.scrollY > 50;
  }
}
