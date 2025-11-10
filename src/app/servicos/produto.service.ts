import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map, catchError } from 'rxjs';
import { Produto } from '../tipos/tipos';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private readonly API_URL = 'http://localhost:3000/produtos';

  constructor(private http: HttpClient) {}

  obterProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.API_URL);
  }

  obterProdutoPorId(id: string | null): Observable<Produto | null> {
    return this.http.get<Produto>(`${this.API_URL}/${id}`);
  }

  adicionarProduto(produto: Produto): Observable<Produto> {
    const novoProduto = {
      ...produto,
      imagem: "assets/img/img-produto.jpeg",
      especificacoes: produto.especificacoes || [],
    };

    return this.http.post<Produto>(this.API_URL, novoProduto);
  }

  atualizarProduto(id: string | undefined, dados: Produto): Observable<Produto> {
    const produtoAtualixado = {
      ...dados,
      imagem: "assets/img/img-produto.jpeg",
      especificacoes: dados.especificacoes || [],
    };
    return this.http.put<Produto>(`${this.API_URL}/${id}`, produtoAtualixado);
  }

  excluirProduto(id: string | undefined): Observable<Produto> {
    return this.http.delete<Produto>(`${this.API_URL}/${id}`);
  }
}
