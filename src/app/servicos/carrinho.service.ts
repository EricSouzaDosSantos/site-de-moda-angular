import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ItemCarrinho } from '../tipos/tipos';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {
  private readonly API_URL = 'http://localhost:3000/carrinho';

  constructor(private http: HttpClient) {}

  obterItens(): Observable<ItemCarrinho[]> {
    return this.http.get<ItemCarrinho[]>(this.API_URL);
  }

  obterTotal(): Observable<number> {
    return this.obterItens().pipe(
      map((itens) => {
        return itens.reduce((total, item) => {
          if (item.produto) {
            return total + item.produto.preco * item.quantidade;
          }
          return total;
        }, 0);
      })
    );
  }

  obterItemPorId(id: string): Observable<ItemCarrinho> {
    return this.http.get<ItemCarrinho>(`${this.API_URL}/${id}`);
  }

  adicionarItem(item: Omit<ItemCarrinho, 'id'>): Observable<ItemCarrinho> {
    return this.http.post<ItemCarrinho>(this.API_URL, item);
  }

  atualizarItem(
    id: string,
    item: Partial<ItemCarrinho>
  ): Observable<ItemCarrinho> {
    return this.http.put<ItemCarrinho>(`${this.API_URL}/${id}`, item);
  }

  removerItem(id: string): Observable<ItemCarrinho> {
    return this.http.delete<ItemCarrinho>(`${this.API_URL}/${id}`);
  }

  aumentarQuantidade(
    id: string,
    quantidadeAtual: number
  ): Observable<ItemCarrinho> {
    const quantidadeAtualizada = quantidadeAtual + 1;
    return this.atualizarItem(id, { quantidade: quantidadeAtualizada });
  }

  diminuirQuantidade(
    id: string,
    quantidadeAtual: number
  ): Observable<ItemCarrinho> {
    if (quantidadeAtual > 1) {
      const quantidadeAtualizada = quantidadeAtual - 1;
      return this.atualizarItem(id, { quantidade: quantidadeAtualizada });
    }
    return this.obterItemPorId(id);
  }
}
