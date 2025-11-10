import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Produto } from '../../tipos/tipos';
import { ProdutoService } from '../../servicos/produto.service';

@Component({
  selector: 'app-administrador-produtos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-produtos.component.html',
  styleUrls: ['./admin-produtos.component.css'],
})
export class AdministradorProdutosComponent implements OnInit {
  produtos: Produto[] = [];
  produtoFormulario: any = {
    id: null,
    nome: '',
    preco: null,
    categoria: '',
    descricao: '',
    estoque: null,
    especificacoesTexto: '',
  };
  carregando = false;
  mensagemSucesso = '';
  mensagemErro = '';

  constructor(private produtoServico: ProdutoService) {}

  ngOnInit(): void {
    this.listarProdutos();
  }

  listarProdutos(): void {
    this.carregando = true;
    this.produtoServico.obterProdutos().subscribe({
      next: (dados) => {
    console.log(dados)
        this.produtos = dados;
        this.carregando = false;
        this.mensagemErro = '';
      },
      error: () => {
        this.mensagemErro = 'Erro ao carregar produtos.';
        this.carregando = false;
      },
    });
  }

  novoProduto(): void {
    this.produtoFormulario = {
      nome: '',
      preco: null,
      categoria: '',
      descricao: '',
      estoque: null,
      especificacoesTexto: '',
    };
    this.mensagemSucesso = '';
    this.mensagemErro = '';
  }

  resetarformsPraAdicionar(): void {
    this.produtoFormulario = {
      id: null,
      nome: '',
      preco: null,
      categoria: '',
      descricao: '',
      estoque: null,
      especificacoesTexto: '',
    };
    this.mensagemSucesso = '';
    this.mensagemErro = '';
  }

  editarProduto(produto: Produto): void {
    this.produtoFormulario = {
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      categoria: produto.categoria,
      descricao: produto.descricao,
      estoque: produto.estoque,
      especificacoesTexto: produto.especificacoes ? produto.especificacoes.join('\n') : '',
    };
    this.mensagemSucesso = '';
    this.mensagemErro = '';
  }

  salvarProduto(): void {
    if (!this.produtoFormulario.nome || this.produtoFormulario.preco == null) {
      this.mensagemErro = 'Preencha pelo meos nome e preço.';
      return;
    }

    if (this.produtoFormulario.id) {
      const produtoAtualizado: Produto = {
        id: this.produtoFormulario.id,
        nome: this.produtoFormulario.nome,
        preco: this.produtoFormulario.preco,
        categoria: this.produtoFormulario.categoria,
        descricao: this.produtoFormulario.descricao,
        imagem: '',
        estoque: this.produtoFormulario.estoque,
        especificacoes: this.produtoFormulario.especificacoesTexto
          .split('\n')
          .filter((item: string) => item.trim() !== ''),
      };

      this.produtoServico.atualizarProduto(produtoAtualizado.id, produtoAtualizado).subscribe({
        next: () => {
          this.mensagemSucesso = 'Produto atualizado com sucesso!';
          this.listarProdutos();
          this.novoProduto();
        },
        error: () => {
          this.mensagemErro = 'Erro ao atualizar produto.';
        },
      });

    } else {
      const novo: Produto = {
        nome: this.produtoFormulario.nome,
        preco: this.produtoFormulario.preco,
        categoria: this.produtoFormulario.categoria,
        descricao: this.produtoFormulario.descricao,
        imagem: '',
        estoque: this.produtoFormulario.estoque,
        especificacoes: this.produtoFormulario.especificacoesTexto
          .split('\n')
          .filter((item: string) => item.trim() !== ''),
      };

      this.produtoServico.adicionarProduto(novo).subscribe({
        next: () => {
          this.mensagemSucesso = 'Produto criado com sucesso!';
          this.listarProdutos();
          this.novoProduto();
        },
        error: () => {
          this.mensagemErro = 'Erro ao criar produto.';
        },
      });
    }
  }

  removerProduto(produto: Produto): void {
    if (!confirm('Tem certeza que deseja remover este produto?')) {
      return;
    }

    console.log(produto)

    this.produtoServico.excluirProduto(produto.id).subscribe({
      next: () => {
        this.mensagemSucesso = 'Produto removido com sucesso!';
        this.listarProdutos();
        if (this.produtoFormulario.id === produto.id) {
          this.novoProduto();
        }
      },
      error: () => {
        this.mensagemErro = 'Erro ao remover produto.';
      },
    });
  }
}
