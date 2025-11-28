import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoComDesconto } from '../../tipos/tipos';
import { FormsModule } from '@angular/forms';
import { ProdutoService } from '../../servicos/produto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-promotions',
  imports: [CommonModule, FormsModule],
  templateUrl: './promocao.componente.html',
  styleUrls: ['./promocao.componente.css'],
  standalone: true,
})
export class PromocaoComponente implements OnInit {
  produtosEmPromocao: ProdutoComDesconto[] = [];
  categoriaSelecionada: string | null = null;
  filtro50offSelecionado = false;
  termoBusca = '';
  ordenarPor = 'padrao';
  carregando = false;

  constructor(private produtoService: ProdutoService, private router: Router) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  get quantidadeVestidosEmPromocao(): number {
    return this.produtosEmPromocao
      ? this.produtosEmPromocao.filter((p) => p.categoria === 'Vestuário')
          .length
      : 0;
  }

  carregarProdutos(): void {
    this.carregando = true;
    this.produtoService.obterProdutos().subscribe({
      next: (produtos) => {
        this.produtosEmPromocao = produtos.map((produto) => {
          const desconto = Math.floor(Math.random() * 31) + 20;
          const precoOriginal = produto.preco;
          const precoPromocional = precoOriginal * (1 - desconto / 100);

          return {
            ...produto,
            precoOriginal,
            desconto,
            precoPromocional: Math.round(precoPromocional * 100) / 100,
          };
        });
        this.carregando = false;
      },
      error: (erro) => {
        console.error('Erro ao carregar produtos:', erro);
        this.carregando = false;
      },
    });
  }

  filtrarPor(category: string | null): void {
    this.categoriaSelecionada = category;
    this.filtro50offSelecionado = false;
  }

  filtrar50off(): void {
    this.filtro50offSelecionado = !this.filtro50offSelecionado;
    if (this.filtro50offSelecionado) {
      this.categoriaSelecionada = null;
    }
  }

  get produtosFiltrados(): ProdutoComDesconto[] {
    let list = [...this.produtosEmPromocao];

    if (this.filtro50offSelecionado) {
      list = list.filter((p) => (p.desconto || 0) >= 50);
    }

    if (this.categoriaSelecionada) {
      list = list.filter((p) => p.categoria === this.categoriaSelecionada);
    }

    const q = (this.termoBusca || '').trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.nome.toLowerCase().includes(q) ||
          (p.categoria || '').toLowerCase().includes(q) ||
          (p.descricao || '').toLowerCase().includes(q)
      );
    }

    switch (this.ordenarPor) {
      case 'preco-crescente':
        list.sort(
          (a, b) =>
            (a.precoPromocional || a.preco) - (b.precoPromocional || b.preco)
        );
        break;
      case 'preco-decrescente':
        list.sort(
          (a, b) =>
            (b.precoPromocional || b.preco) - (a.precoPromocional || a.preco)
        );
        break;
      case 'desconto':
        list.sort((a, b) => (b.desconto || 0) - (a.desconto || 0));
        break;
      default:
        break;
    }

    return list;
  }

  verProduto(id: string | undefined): void {
    if (id) {
      this.router.navigate(['/produto', id]);
    }
  }
}
