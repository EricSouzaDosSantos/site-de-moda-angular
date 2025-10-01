import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-google-signin-button',
  imports: [],
  templateUrl: './google-signin-button.component.html',
  styleUrl: './google-signin-button.component.css'
})
export class GoogleSigninButtonComponent {
  @Input() buttonText: string = '';

}
