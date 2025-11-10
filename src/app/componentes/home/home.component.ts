import { Component } from '@angular/core';
import { TabelaDeProdutosComponent } from '../tabela-de-produtos/tabela-de-produtos.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TabelaDeProdutosComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {}
