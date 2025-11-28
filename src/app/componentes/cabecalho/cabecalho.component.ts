import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { RouterLink } from '@angular/router';
import {
  heroShoppingBag,
  heroUser,
  heroMagnifyingGlass,
} from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-cabecalho',
  standalone: true,
  imports: [CommonModule, RouterLink, NgIconComponent],
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css'],
  providers: [provideIcons({ heroUser, heroShoppingBag, heroMagnifyingGlass })],
})
export class CabecalhoComponent {
  escrolado = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // console.log('Scroll Y:', this.escrolado);
    this.escrolado = window.scrollY > 50;
  }
}
