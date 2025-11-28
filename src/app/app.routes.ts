import { Routes } from '@angular/router';
import { PaginaHomeComponent } from './paginas/pagina-home/pagina-home.component';
import { LoginComponent } from './paginas/login/login.component';
import { CadastroComponent } from './paginas/cadastro/cadastro.component';
import { DetalhesProdutoComponent } from './paginas/detalhes-produto/detalhes-produto.component';
import { AdministradorProdutosComponent } from './paginas/admin-produtos/admin-produtos.component';
import { CarrinhoComponent } from './componentes/carrinho/carrinho.component';
import { PagamentoComponent } from './componentes/pagamento/pagamento.component';
import { PromocaoComponente } from './paginas/promocao/promocao.componente';

export const routes: Routes = [
  {
    path: '',
    component: PaginaHomeComponent,
    pathMatch: 'full',
    title: 'Home',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'cadastro',
    component: CadastroComponent,
    title: 'Cadastro',
  },
  {
    path: 'produto/:id',
    component: DetalhesProdutoComponent,
    title: 'Detalhes do produto',
  },
  {
    path: 'admin',
    component: AdministradorProdutosComponent,
    title: 'Administrador dos Produtos',
  },
  {
    path: 'carrinho',
    component: CarrinhoComponent,
    title: 'Carrinho de compras',
  },
  {
    path: 'pagamento',
    component: PagamentoComponent,
    title: 'Pagamento',
  },
  {
    path: 'promocoes',
    component: PromocaoComponente,
    title: 'Promoções',
  },
];
