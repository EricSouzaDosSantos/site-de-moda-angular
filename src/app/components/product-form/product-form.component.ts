import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
} from '@angular/forms';
import { Product } from '../../models/product.interface';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent implements OnInit {
  @Input() product: Product | null = null;
  @Input() isEditMode: boolean = false;
  @Output() onSave = new EventEmitter<Product>();
  @Output() onCancel = new EventEmitter<void>();

  productForm!: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | null = null;

  categories = ['Vestuário', 'Acessórios', 'Calçados', 'Bolsas'];

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.initForm();
  }

  ngOnInit(): void {
    if (this.product && this.isEditMode) {
      this.loadProductData();
    }
  }

  private initForm(): void {
    this.productForm = this.fb.group({
      id: [0],
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [0, [Validators.required, Validators.min(0.01)]],
      category: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      image: [''],
      fullDescription: [''],
      stock: [0, [Validators.required, Validators.min(0)]],
      rating: [0, [Validators.min(0), Validators.max(5)]],
      reviews: [0, [Validators.min(0)]],
      specifications: this.fb.array([]),
    });
  }

  private loadProductData(): void {
    if (this.product) {
      this.productForm.patchValue(this.product);
      this.imagePreview = this.product.image;

      if (this.product.specifications) {
        const specificationsArray = this.specifications;
        this.product.specifications.forEach((spec) => {
          specificationsArray.push(this.fb.control(spec, Validators.required));
        });
      }
    }
  }

  get specifications(): FormArray {
    return this.productForm.get('specifications') as FormArray;
  }

  addSpecification(): void {
    this.specifications.push(this.fb.control('', Validators.required));
  }

  removeSpecification(index: number): void {
    this.specifications.removeAt(index);
  }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedFile = target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const formData = this.productForm.value;

      const productData = {
        ...formData,
        specifications: this.specifications.value.filter(
          (spec: string) => spec.trim() !== ''
        ),
      };

      let savedProduct: Product;

      if (this.isEditMode && this.product) {
        this.productService.updateProduct(this.product.id, productData);
        savedProduct = { ...this.product, ...productData };
      } else {
        savedProduct = this.productService.addProduct(productData);
      }

      this.onSave.emit(savedProduct);
    } else {
      this.markFormGroupTouched();
    }
  }

  cancel(): void {
    this.onCancel.emit();
  }

  loadProduct(product: Product): void {
    this.product = product;
    this.isEditMode = true;
    this.loadProductData();
  }

  resetForm(): void {
    this.productForm.reset();
    this.selectedFile = null;
    this.imagePreview = null;
    this.specifications.clear();
    this.isEditMode = false;
    this.product = null;
  }

  private markFormGroupTouched(): void {
    Object.keys(this.productForm.controls).forEach((key) => {
      const control = this.productForm.get(key);
      control?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.productForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.productForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return `${fieldName} é obrigatório`;
      if (field.errors['minlength'])
        return `${fieldName} deve ter pelo menos ${field.errors['minlength'].requiredLength} caracteres`;
      if (field.errors['min'])
        return `${fieldName} deve ser maior que ${field.errors['min'].min}`;
      if (field.errors['max'])
        return `${fieldName} deve ser menor que ${field.errors['max'].max}`;
    }
    return '';
  }
}
