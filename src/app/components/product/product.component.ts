import { Component,EventEmitter,Input, OnInit, Output } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EditproductComponent } from '../editproduct/editproduct.component';

import {MatTooltipModule} from '@angular/material/tooltip';
import { ProductService } from '../../product.service';
import { SharedServiceService } from '../../shared-service.service';
// import { response } from 'express';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [MatCardModule,MatButtonModule,CommonModule,EditproductComponent,MatTooltipModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  constructor(private router: Router,private productService: ProductService,private sharedService: SharedServiceService) {}
  cartItemsData: any ;
  
  ngOnInit(): void {
    // console.log(this.cartItemsCount);

  }
  @Input() cartItemsCount:any;
  @Input() product: any;
  @Output() CartItemsCount = new EventEmitter<any>();
  addToCart() {
    this.productService.productExist(this.product.id).subscribe((result: any) => {
      let counter = 1; // Default counter value
      if (result) {
        counter = result.quantity + 1;
      }
  
      this.productService.updateQuantity(this.product.id, counter).subscribe(() => {
        console.log("Updated quantity in cart");
        
        this.productService.getAddToCart().subscribe((cartItems:{ [key: string]: any }) => {
          let totalQuantity =  Object.values(cartItems).reduce((total, item) => total + item.quantity, 0);
          this.CartItemsCount.emit(totalQuantity);
        });
        this.sharedService.triggerFunction3();
      });
  
      if (!result) {
        this.productService.addToCart(this.product).subscribe(() => {
          console.log("Added to cart");
          this.productService.updateQuantity(this.product.id, counter).subscribe(() => {
            console.log("Updated quantity in cart");
            });
          this.productService.getAddToCart().subscribe((cartItems:{ [key: string]: any }) => {
            let totalQuantity =  Object.values(cartItems).reduce((total, item) => total + item.quantity, 0);
            this.CartItemsCount.emit(totalQuantity);
          });
          this.sharedService.triggerFunction3();
        });
      }

    });
  }
  
  
  @Output() productBuy= new EventEmitter<any>();
  viewNow(title: string, id: string) {
    console.log("View Event Clicked");
    console.log(id);
    console.log(`/product/${title}/${id}`)
    this.router.navigateByUrl(`/product/${title}/${id}`, { state: { id, title } });

  }
  
}
