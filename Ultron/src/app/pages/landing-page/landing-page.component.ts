import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ProductsListComponent } from '../../components/products-list/products-list.component';
import { FilterMenuComponent } from '../../components/filter-menu/filter-menu.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, ProductsListComponent, FilterMenuComponent], // <- add both components here
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
      this.filteredProducts = data;

      this.route.queryParams.subscribe(params => {
        const q = params['q']?.toLowerCase() || '';
        this.filteredProducts = q
          ? this.products.filter(p => p.name.toLowerCase().includes(q))
          : this.products;
      });
    });
  }
}
