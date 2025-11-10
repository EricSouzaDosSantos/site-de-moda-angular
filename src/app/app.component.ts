import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {RodapeComponent} from "./componentes/rodape/rodape.component";
import {CabecalhoComponent} from './componentes/cabecalho/cabecalho.component';
import {HomeComponent} from './componentes/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RodapeComponent, CabecalhoComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'site-moda-v2';
}
