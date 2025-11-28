import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagamento',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './pagamento.component.html',
  styleUrl: './pagamento.component.css',
})
export class PagamentoComponent implements OnInit {
  formularioPagamento!: FormGroup;
  submetido: boolean = false;
  pagamentoSucesso: boolean = false;

  constructor(private construtorFormulario: FormBuilder) {}

  ngOnInit(): void {
    this.formularioPagamento = this.construtorFormulario.group({
      nomeCartao: ['', Validators.required],
      numeroCartao: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{16}$/)],
      ],
      dataValidade: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/),
        ],
      ],
      cvv: ['', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]],
      endereco: this.construtorFormulario.group({
        rua: ['', Validators.required],
        cidade: ['', Validators.required],
        cep: ['', Validators.required],
      }),
    });
  }

  get controles() {
    return this.formularioPagamento.controls;
  }

  get controlesEndereco() {
    return (this.controles['endereco'] as FormGroup).controls;
  }

  enviar(): void {
    this.submetido = true;

    if (this.formularioPagamento.invalid) {
      return;
    }

    console.log('Dados do pagamento:', this.formularioPagamento.value);

    setTimeout(() => {
      this.pagamentoSucesso = true;
      alert('Pagamento processado com sucesso!');
      this.formularioPagamento.reset();
      this.submetido = false;
    }, 1500);
  }
}
