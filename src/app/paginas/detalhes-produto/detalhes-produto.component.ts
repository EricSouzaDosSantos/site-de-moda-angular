import {Component, OnInit} from '@angular/core';
import {Produto} from '../../tipos/tipos';
import {ActivatedRoute, Router} from '@angular/router';
import {ProdutoService} from '../../servicos/produto.service';
import {CommonModule, Location} from '@angular/common';

@Component({
  selector: 'app-detalhes-produto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalhes-produto.component.html',
  styleUrl: './detalhes-produto.component.css'
})
export class DetalhesProdutoComponent implements OnInit{
  produto: Produto | null = null;
  quantidade: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private produtoServico: ProdutoService
  ) {
  }


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

  adicionarNoCarrinho(): void {
    if (this.produto) {
      console.log(
        `Adicionado ao carrinho: ${this.produto.nome}, Quantidade: ${this.quantidade}`
      );
      alert(`${this.produto.nome} adicionado ao carrinho!`);
    }
  }

}
