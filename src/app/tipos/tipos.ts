export interface Produto {
  id?: string;
  nome: string;
  preco: number;
  categoria: string;
  descricao: string;
  imagem: string;
  especificacoes?: string[];
  estoque?: number;
}

export interface Usuario {
  id?: string;
  email: string;
  senha: string;
  nome?: string;
  telefone?: string;
  cpf?: string;
}

export interface ItemCarrinho {
  id?: string;
  produtoId: string;
  quantidade: number;
  produto?: Produto;
}

export interface ProdutoComDesconto extends Produto {
  precoOriginal?: number;
  desconto?: number;
  precoPromocional?: number;
}