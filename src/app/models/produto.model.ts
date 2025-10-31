export interface Produto {
  id: number;
  nome: string;
  imagemUrl: string;
  preco: number;
  precoPromotional?: number;
  desconto: number;
  categoria: string;
}