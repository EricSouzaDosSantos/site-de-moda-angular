import { Component } from '@angular/core';
import { ProductFormComponent } from "../product-form/product-form.component";
import { ProductTableComponent } from "../product-table/product-table.component";

@Component({
  selector: 'app-products',
  imports: [ProductFormComponent, ProductTableComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

}
