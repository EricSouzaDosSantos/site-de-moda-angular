import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produto } from '../../models/produto.model';
import { CardProdutoComponent } from '../card-produto.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { PromoSearchPipe } from '../promo-search.pipe';
import { PromoSortPipe } from '../promo-sort.pipe';

@Component({
  selector: 'app-promotions',
  imports: [CommonModule, CardProdutoComponent, HeaderComponent, FooterComponent, FormsModule, PromoSearchPipe, PromoSortPipe],
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent {
  
  produtoempromocao: Produto[] = [];
  selectedCategory: string | null = null;
  selectedHalfOff = false;
  searchQuery = '';
  sortBy = 'default';

  constructor() { }


  ngOnInit(): void {
    this.carregarDadosSimulados();
  }

get quantidadeVestidosEmPromocao(): number {
  return this.produtoempromocao
    ? this.produtoempromocao.filter(p => p.categoria === 'Vestidos').length
    : 0;
}

  carregarDadosSimulados(): void {
    
    this.produtoempromocao = [
      { id: 1, nome: 'Vestido Florido', imagemUrl: 'https://picsum.photos/seed/vestido1/400/600', preco: 150.00, precoPromotional: 120.00, desconto: 20, categoria: 'Vestidos' },
      { id: 2, nome: 'Calça Cargo Azul', imagemUrl: 'https://picsum.photos/seed/calca2/400/600', preco: 99.90, precoPromotional: 79.92, desconto: 20, categoria: 'Calças' },
      { id: 3, nome: 'Blusa de Tricô', imagemUrl: 'https://picsum.photos/seed/blusa3/400/600', preco: 180.00, precoPromotional: 108.00, desconto: 40, categoria: 'Blusas' },
      { id: 4, nome: 'Jaqueta de Couro', imagemUrl: 'https://picsum.photos/seed/jaqueta4/400/600', preco: 350.00, precoPromotional: 300.00, desconto: 14, categoria: 'Inverno' },
    ];
  }

  filterBy(category: string | null): void {
    this.selectedCategory = category;
    this.selectedHalfOff = false;
  }

  filterHalfOff(): void {
    this.selectedHalfOff = !this.selectedHalfOff;
    if (this.selectedHalfOff) {
        this.selectedCategory = null;
    }
  }

  get produtosFiltrados(): Produto[] {
    let list = this.produtoempromocao;
    if (this.selectedHalfOff) {
      return list.filter(p => p.desconto === 50);
    }
    if (!this.selectedCategory) return list;
    return list.filter(p => p.categoria === this.selectedCategory);
  }
}


