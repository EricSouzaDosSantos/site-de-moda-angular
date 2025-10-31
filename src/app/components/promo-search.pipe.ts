import { Pipe, PipeTransform } from '@angular/core';
import { Produto } from '../models/produto.model';

@Pipe({
  name: 'promoSearch',
  standalone: true
})
export class PromoSearchPipe implements PipeTransform {
  transform(items: Produto[] | null | undefined, query?: string): Produto[] {
    if (!items) return [];
    if (!query) return items;
    const q = query.trim().toLowerCase();
    return items.filter(i => i.nome.toLowerCase().includes(q) || (i.categoria || '').toLowerCase().includes(q));
  }
}
