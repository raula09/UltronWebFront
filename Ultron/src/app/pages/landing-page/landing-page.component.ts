import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from '../../components/products-list/products-list.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
   
  imports: [CommonModule, ProductsListComponent, HeaderComponent], 
  template: `
    <app-header></app-header>
    <app-products-list [selfLoad]="true"></app-products-list>
  `,
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {

  }
}
