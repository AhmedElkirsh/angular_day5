import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products: any;
  constructor(private productServices: ProductService) {}
  ngOnInit(): void {
    this.productServices.getAllProducts().subscribe({
      next: (response) => {
        this.products = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  deleteHandler(productId: any) {
    this.productServices.deleteProduct(productId).subscribe({
      next: () => {
        this.products = this.products.filter(
          (product: any) => product.id != productId
        );
      },
    });
  }
}
