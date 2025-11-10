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
