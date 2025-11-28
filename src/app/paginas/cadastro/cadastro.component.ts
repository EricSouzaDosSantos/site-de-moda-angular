import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutenticacaoService } from '../../servicos/autenticacao.service';
import { Router } from '@angular/router';
import { Usuario } from '../../tipos/tipos';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {

  dadosFormulario = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefone: new FormControl('', [Validators.required]),
    cpf: new FormControl('', [Validators.required]),
    senha: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmarSenha: new FormControl('', [Validators.required]),
  });

  mensagemErro = '';
  carregando = false;

  constructor(
    private autenticacaoServico: AutenticacaoService,
    private router: Router
  ) {}

  salvar(): void {
    if (this.dadosFormulario.valid) {
      this.carregando = true;
      this.mensagemErro = '';

      const nome = this.dadosFormulario.value.nome || '';
      const email = this.dadosFormulario.value.email || '';
      const telefone = this.dadosFormulario.value.telefone || '';
      const cpf = this.dadosFormulario.value.cpf || '';
      const senha = this.dadosFormulario.value.senha || '';

      const novoUsuario: Usuario = {
        nome: nome,
        email: email,
        senha: senha,
        telefone: telefone,
        cpf: cpf
      };

      this.autenticacaoServico.salvarUsuario(novoUsuario).subscribe({
        next: (usuario) => {
          this.carregando = false;
          if (usuario) {
            alert(
              `Cadastro realizado com sucesso!${
                usuario.nome || email
              }!`
            );
            this.router.navigate(['/']);
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
