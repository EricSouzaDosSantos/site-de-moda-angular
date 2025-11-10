import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Produto } from '../../tipos/tipos';
import { ProdutoService } from '../../servicos/produto.service';

@Component({
  selector: 'app-tabela-produtos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabela-de-produtos.component.html',
  styleUrls: ['./tabela-de-produtos.component.css'],
})
export class TabelaDeProdutosComponent implements OnInit {
  @Input() produtos: Produto[] = [];
  @Input() modoAdmin: boolean = false;

  produtosFiltrados: Produto[] = [];
  tamanhoPagina = 4;
  indiceAtual = 0;
  larguraCartao = 320;
  espacamento = 20;
  passo = this.larguraCartao + this.espacamento;
  tempoAnimacao = 320;
  larguraViewport = this.passo * this.tamanhoPagina - this.espacamento;

  constructor(private router: Router, private produtoService: ProdutoService) {}

  ngOnInit(): void {
    if (this.produtos.length > 0) {
      this.produtosFiltrados = this.produtos;
      this.indiceAtual = 0;
    } else {
      this.produtoService.obterProdutos().subscribe({
        next: (dados) => {
          this.produtosFiltrados = dados;
          this.indiceAtual = 0;
        },
        error: (erro) => console.error('Erro ao carregar produtos:', erro),
      });
    }
  }

  get produtosVisiveis(): Produto[] {
    return this.produtosFiltrados.slice(
      this.indiceAtual,
      this.indiceAtual + this.tamanhoPagina
    );
  }

  animando = false;

  podeVoltar(): boolean {
    return this.indiceAtual > 0;
  }

  podeAvancar(): boolean {
    return (
      this.indiceAtual + this.tamanhoPagina < this.produtosFiltrados.length
    );
  }

  voltar(): void {
    if (!this.podeVoltar() || this.animando) return;
    this.animando = true;
    this.indiceAtual = Math.max(0, this.indiceAtual - 1);
    setTimeout(() => (this.animando = false), this.tempoAnimacao + 20);
  }

  avancar(): void {
    if (!this.podeAvancar() || this.animando) return;
    this.animando = true;
    const maxStart = Math.max(
      0,
      this.produtosFiltrados.length - this.tamanhoPagina
    );
    this.indiceAtual = Math.min(maxStart, this.indiceAtual + 1);
    setTimeout(() => (this.animando = false), this.tempoAnimacao + 20);
  }

  verProduto(id: string | undefined): void {
    this.router.navigate(['/produto', id]);
  }

  editarProduto(produto: Produto, event: Event): void {
    event.stopPropagation();
    console.log('Editar produto:', produto);
  }
}
