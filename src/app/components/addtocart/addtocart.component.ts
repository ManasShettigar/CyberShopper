import { Component, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routes } from '../../app.routes';
import { RouterLink } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { CartproductsComponent } from '../cartproducts/cartproducts.component';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-addtocart',
  standalone: true,
  imports: [RouterLink,MatButtonModule,CartproductsComponent,CommonModule],
  templateUrl: './addtocart.component.html',
  styleUrl: './addtocart.component.css'
})
export class AddtocartComponent {
  data:any
  totalPrice=0
  constructor(private cartProducts: ProductService){}

  ngOnInit(): void {
    var totalPrice=0
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.cartProducts.getAddToCart().subscribe((result)=>{
      this.data=result
      for(var i=0;i<this.data.length;i++){
        totalPrice=totalPrice+this.data[i].price*this.data[i].quantity
        this.totalPrice=totalPrice
      }
    })
    // console.log(this.data)
  }
  onFunctionTriggered(){
    this.cartProducts.getAddToCart().subscribe((result)=>{
      var totalPrice=0
      this.data=result
      for(var i=0;i<this.data.length;i++){
        totalPrice=totalPrice+this.data[i].price*this.data[i].quantity
        this.totalPrice=totalPrice

      }
    })
  }
  }
  

