import { Component } from '@angular/core';
import { CabecalhoComponent } from '../../componentes/cabecalho/cabecalho.component';
import { HomeComponent } from '../../componentes/home/home.component';
import { RodapeComponent } from '../../componentes/rodape/rodape.component';

@Component({
  selector: 'app-pagina-home',
  imports: [HomeComponent],
  templateUrl: './pagina-home.component.html',
  styleUrl: './pagina-home.component.css'
})
export class PaginaHomeComponent {

}
