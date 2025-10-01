import { Component } from '@angular/core';
import { ProductTableComponent } from '../product-table/product-table.component';

@Component({
  selector: 'app-home',
  imports: [ProductTableComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
