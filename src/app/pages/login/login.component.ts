import { Component, Input } from '@angular/core';
import { GoogleSigninButtonComponent } from '../../components/ui/google-signin-button/google-signin-button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [GoogleSigninButtonComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @Input() email: string = '';
  @Input() password: string = '';

  onGoogleSignIn(): void {
    console.log('Iniciando login com Google...');
  }

  constructor(private router: Router) {}

  onLogin(): void {
    if(this.email == "admin@gmail.com" && this.password == "admin"){
    this.router.navigate(['/admin/products']);
    }else if(this.email == "teste@gmail.com)" && this.password == "teste"){
      this.router.navigate(['/']);
    }
  }
}
