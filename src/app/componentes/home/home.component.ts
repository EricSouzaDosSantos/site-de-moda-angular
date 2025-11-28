import { Component } from '@angular/core';
import { TabelaDeProdutosComponent } from '../tabela-de-produtos/tabela-de-produtos.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TabelaDeProdutosComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {}