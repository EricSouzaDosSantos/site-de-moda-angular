import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { heroMagnifyingGlass } from '@ng-icons/heroicons/outline';
import { provideIcons, NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-admin-header',
  imports: [CommonModule, FormsModule, NgIcon],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css',
  providers: [provideIcons({ heroMagnifyingGlass })],
})
export class AdminHeaderComponent {
  @Output() onCreateProduct = new EventEmitter<void>();
  @Output() onFilterChange = new EventEmitter<string>();
  @Output() onDeleteSelected = new EventEmitter<void>();
  @Output() onSelectAll = new EventEmitter<boolean>();

  searchTerm: string = '';
  selectedCategory: string = '';
  isAllSelected: boolean = false;

  categories = [
    { value: '', label: 'Todas as categorias' },
    { value: 'Vestuário', label: 'Vestuário' },
    { value: 'Acessórios', label: 'Acessórios' },
    { value: 'Calçados', label: 'Calçados' },
  ];

  onSearchChange(): void {
    this.emitFilter();
  }

  onCategoryChange(): void {
    this.emitFilter();
  }

  private emitFilter(): void {
    const filterText = `${this.searchTerm}|${this.selectedCategory}`;
    this.onFilterChange.emit(filterText);
  }

  createProduct(): void {
    this.onCreateProduct.emit();
  }

  deleteSelected(): void {
    this.onDeleteSelected.emit();
  }

  toggleSelectAll(): void {
    this.isAllSelected = !this.isAllSelected;
    this.onSelectAll.emit(this.isAllSelected);
  }
}
