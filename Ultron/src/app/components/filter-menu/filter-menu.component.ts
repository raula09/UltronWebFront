import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';

interface Brand {
  name: string;
  logo: string;
}

interface Category {
  id: string;
  name: string;
  icon: string;
}

@Component({
  selector: 'app-filter-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter-menu.component.html',
  styleUrls: ['./filter-menu.component.css'],
  animations: [
    trigger('slideInTopToBottom', [
      transition(':enter', [
        style({ transform: 'translateY(-10%)', opacity: 0 }),
        animate('500ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({ transform: 'translateY(-10%)', opacity: 0 }))
      ]),
    ]),
  ],
})
export class FilterMenuComponent implements OnInit {
  @Output() categorySelected = new EventEmitter<string>();
  @Output() brandSelected = new EventEmitter<string>();

  selectedCategory: string | null = null;
  selectedBrand: string | null = null;

  categoryMenu = false;
  brandMenu = false;

  categories: Category[] = [
    { id: 'laptop', name: 'Laptop', icon: 'Vector.svg' },
    { id: 'tv', name: 'TV', icon: 'VectorTv.svg' },
    { id: 'tablet', name: 'Tablet', icon: 'tablet.svg' },
    { id: 'phone', name: 'Phone', icon: 'Group.svg' },
  ];

  brandsArray: Brand[] = [
    { name: 'apple', logo: 'apple-removebg-preview.png' },
    { name: 'asus', logo: 'asuslogo-removebg-preview.png' },
    { name: 'google', logo: 'google-removebg-preview.png' },
    { name: 'lenovo', logo: 'lenovo-removebg-preview.png' },
    { name: 'samsung', logo: 'samsung-removebg-preview.png' },
  ];

  ngOnInit(): void {}

  handleCategorySelect(categoryId: string) {
    this.selectedCategory = categoryId;
    this.categorySelected.emit(categoryId);
    this.categoryMenu = false;
  }

  handleBrandSelect(brandName: string) {
    this.selectedBrand = brandName;
    this.brandSelected.emit(brandName);
    this.brandMenu = false;
  }

  handleCategoryMenu() {
    this.categoryMenu = !this.categoryMenu;
    this.brandMenu = false;
  }

  handleBrandMenu() {
    this.brandMenu = !this.brandMenu;
    this.categoryMenu = false;
  }
}
