import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'], // Corrected styleUrls
})
export class ProductFormComponent implements OnInit {
  productId: any;
  productForm: FormGroup;

  constructor(
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      price: new FormControl('', [Validators.required]),
      quantity: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (response) => {
        this.productId = response['id'];
        if (this.productId != 0) {
          this.productService.getProductById(this.productId).subscribe({
            next: (response) => {
              this.productForm.patchValue({
                name: response.name,
                price: response.price.toString(),
                quantity: response.quantity.toString(),
              });
            },
          });
        }
      },
    });
  }

  get getName() {
    return this.productForm.controls['name'];
  }

  get getPrice() {
    return this.productForm.controls['price'];
  }

  get getQuantity() {
    return this.productForm.controls['quantity'];
  }

  productHandler(e: any) {
    e.preventDefault();
    if (this.productForm.valid) {
      if (this.productId == 0) {
        this.productService.addNewProduct(this.productForm.value).subscribe({
          next: () => {
            this.router.navigate(['/products']);
          },
        });
      } else {
        this.productService
          .editProduct(this.productId, this.productForm.value)
          .subscribe({
            next: () => {
              this.router.navigate(['/products']);
            },
          });
      }
    } else {
      console.log('Errors');
    }
  }
}
