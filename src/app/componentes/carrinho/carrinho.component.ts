import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarrinhoService } from '../../servicos/carrinho.service';
import { ItemCarrinho } from '../../tipos/tipos';
import { Route, RouterLink } from '@angular/router';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css'],
})
export class CarrinhoComponent {
  private carrinhoService = inject(CarrinhoService);

  carrinho = this.carrinhoService.obterItens();

  total = this.carrinhoService.obterTotal();

  aumentarQuantidade(item: ItemCarrinho): void {
    if (item.id) {
      this.carrinhoService
        .aumentarQuantidade(item.id, item.quantidade)
        .subscribe({
          next: () => {
            this.carrinho = this.carrinhoService.obterItens();
            this.total = this.carrinhoService.obterTotal();
          },
        });
    }
  }

  diminuirQuantidade(item: ItemCarrinho): void {
    if (item.id) {
      this.carrinhoService
        .diminuirQuantidade(item.id, item.quantidade)
        .subscribe({
          next: () => {
            this.carrinho = this.carrinhoService.obterItens();
            this.total = this.carrinhoService.obterTotal();
          },
        });
    }
  }

  removerProduto(id: string): void {
    if (id) {
      this.carrinhoService.removerItem(id).subscribe({
        next: () => {
          this.carrinho = this.carrinhoService.obterItens();
          this.total = this.carrinhoService.obterTotal();
        },
      });
    }
  }

  confirmarPedido(): void {
    this.carrinho.subscribe((itens) => {
      if (itens.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
      }
    });
  }
}
