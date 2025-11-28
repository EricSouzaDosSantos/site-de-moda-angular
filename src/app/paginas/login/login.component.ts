import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacaoService } from '../../servicos/autenticacao.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  formulario = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  mensagemErro = '';
  carregando = false;

  constructor(
    private autenticacaoServico: AutenticacaoService,
    private router: Router
  ) {}

  logar(): void {
    if (this.formulario.valid) {
      this.carregando = true;
      this.mensagemErro = '';

      const email = this.formulario.value.email || '';
      const senha = this.formulario.value.senha || '';

      this.autenticacaoServico.validarLogin(email, senha).subscribe({
        next: (usuario) => {
          this.carregando = false;
          if (usuario) {
            alert(
              `Login realizado com sucesso!\nBem-vindo, ${
                usuario.nome || email
              }!`
            );
            this.router.navigate(['/']);
          } else {
            this.mensagemErro = 'Email ou senha incorretos.';
          }
        },
        error: () => {
          this.carregando = false;
          this.mensagemErro = 'Erro ao conectar com o servidor.';
        },
      });
    }
  }
}
