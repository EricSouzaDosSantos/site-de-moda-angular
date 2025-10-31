import { Pipe, PipeTransform } from '@angular/core';
import { Produto } from '../models/produto.model';

@Pipe({
  name: 'promoSort',
  standalone: true
})
export class PromoSortPipe implements PipeTransform {
  transform(items: Produto[] | null | undefined, sortBy?: string): Produto[] {
    if (!items) return [];
    const list = [...items];
    switch (sortBy) {
      case 'price-asc':
        return list.sort((a,b) => (a.precoPromotional || a.preco) - (b.precoPromotional || b.preco));
      case 'price-desc':
        return list.sort((a,b) => (b.precoPromotional || b.preco) - (a.precoPromotional || a.preco));
      case 'discount':
        return list.sort((a,b) => (b.desconto || 0) - (a.desconto || 0));
      default:
        return items;
    }
  }
}
