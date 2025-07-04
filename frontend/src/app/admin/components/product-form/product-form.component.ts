import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateProductDto, Product } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/products.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class ProductFormComponent implements OnInit {
  product: CreateProductDto = {
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    stock: 0,
  };

  isEdit = false;
  productId: number | null = null;
  error: string | null = null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.productId = idParam ? +idParam : null;

    if (this.productId) {
      this.isEdit = true;
      this.productService.getProductById(this.productId.toString()).subscribe({
        next: (product) => {
          // Strip off id and createdAt for editing form
          this.product = {
            name: product.name,
            description: product.description,
            price: product.price,
            imageUrl: product.imageUrl,
            stock: product.stock,
          };
        },
        error: (err) => {
          console.error('Failed to load product', err);
          this.error = 'Failed to load product for editing';
        },
      });
    }
  }

  onSubmit(): void {
    if (this.isEdit && this.productId !== null) {
      const updatedProduct: Product = {
        ...this.product,
        id: this.productId,
        createdAt: new Date().toISOString(),
      };

      this.productService
        .updateProduct(this.productId.toString(), updatedProduct)
        .subscribe({
          next: () => this.router.navigate(['/admin']),
          error: (err) => {
            console.error('Failed to update product:', err);
            this.error = 'Failed to update product';
          },
        });
    } else {
      this.productService.createProduct(this.product).subscribe({
        next: () => this.router.navigate(['/admin']),
        error: (err) => {
          console.error('Failed to create product:', err);
          this.error = 'Failed to create product';
        },
      });
    }
  }
}
