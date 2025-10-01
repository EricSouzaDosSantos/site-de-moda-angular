import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { GoogleSigninButtonComponent } from '../../components/ui/google-signin-button/google-signin-button.component';

@Component({
  selector: 'app-register',
  imports: [GoogleSigninButtonComponent, FormsModule, NgxMaskDirective],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  formData = {
    name: '',
    email: '',
    phone: '',
    cpf: '',
    password: '',
    confirmPassword: '',
  };

  onSubmit() {
    console.log('Dados do formulário:', this.formData);
  }
}
