
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produto } from '../models/produto.model';

@Component({
  selector: 'app-card-produto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-produto.component.html',
  styleUrls: ['./card-produto.component.css']
})
export class CardProdutoComponent {
  
  @Input({ required: true }) product!: Produto;

}