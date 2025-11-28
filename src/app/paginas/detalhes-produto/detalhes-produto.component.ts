import { Component, OnInit } from '@angular/core';
import { Produto } from '../../tipos/tipos';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from '../../servicos/produto.service';
import { CarrinhoService } from '../../servicos/carrinho.service';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detalhes-produto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detalhes-produto.component.html',
  styleUrl: './detalhes-produto.component.css',
})
export class DetalhesProdutoComponent implements OnInit {
  produto: Produto | null = null;
  quantidade: number = 1;
  adicionando: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private produtoServico: ProdutoService,
    private carrinhoServico: CarrinhoService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    this.produtoServico.obterProdutoPorId(productId).subscribe({
      next: (product) => {
        if (product) {
          this.produto = product;
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (error) => {
        console.error('Erro ao carregar produto:', error);
        this.router.navigate(['/']);
      },
    });
  }
  voltar(): void {
    this.location.back();
  }

  diminuirQuantidade(): void {
    if (this.quantidade > 1) {
      this.quantidade--;
    }
  }

  aumentarQuantidade(): void {
    const estoqueMaximo = this.produto?.estoque ?? 999;
    if (this.quantidade < estoqueMaximo) {
      this.quantidade++;
    }
  }

  adicionarNoCarrinho(): void {
    if (!this.produto || !this.produto.id || this.adicionando) {
      return;
    }

    this.adicionando = true;

    this.carrinhoServico.obterItens().subscribe({
      next: (itens) => {
        const itemExistente = itens.find(
          (item) => item.produtoId === this.produto!.id
        );

        if (itemExistente && itemExistente.id) {
          const novaQuantidade = itemExistente.quantidade + this.quantidade;
          this.carrinhoServico
            .atualizarItem(itemExistente.id, { quantidade: novaQuantidade })
            .subscribe({
              next: () => {
                alert(
                  `${
                    this.produto!.nome
                  } adicionado ao carrinho! Quantidade: ${novaQuantidade}`
                );
                this.adicionando = false;
              },
              error: () => {
                alert('Erro ao atualizar item no carrinho.');
                this.adicionando = false;
              },
            });
        } else {
          const produto = this.produto;
          if (produto && produto.id) {
            const novoItem = {
              produtoId: produto.id,
              quantidade: this.quantidade,
              produto: produto,
            };

            this.carrinhoServico.adicionarItem(novoItem).subscribe({
              next: () => {
                alert(`${produto.nome} adicionado ao carrinho!`);
                this.adicionando = false;
              },
              error: () => {
                alert('Erro ao adicionar item ao carrinho.');
                this.adicionando = false;
              },
            });
          }
        }
      },
      error: () => {
        alert('Erro ao verificar carrinho.');
        this.adicionando = false;
      },
    });
  }
}
