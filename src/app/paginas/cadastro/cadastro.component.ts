import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { CabecalhoComponent } from "../../componentes/cabecalho/cabecalho.component";

@Component({
  selector: 'app-cadastro',
  imports: [FormsModule, NgxMaskDirective],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  dadosFormulario = {
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    senha: '',
    confirmarSenha: '',
  };

  enviar() {
    console.log('Dados do formulário:', this.dadosFormulario);
  }
}
