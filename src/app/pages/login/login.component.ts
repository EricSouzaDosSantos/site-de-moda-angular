import { Component } from '@angular/core';
import { GoogleSigninButtonComponent } from '../../components/ui/google-signin-button/google-signin-button.component';

@Component({
  selector: 'app-login',
  imports: [GoogleSigninButtonComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  // Nenhuma lógica de formulário necessária
  onGoogleSignIn(): void {
    console.log('Iniciando login com Google...');
  }
}
