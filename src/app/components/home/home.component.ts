import { Component, inject } from '@angular/core';
import { ChangeDetectorRef,ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ProductComponent } from '../product/product.component';
import { SearchComponent } from '../search/search.component';
import { ProductService } from '../../product.service';
import { AddproductComponent } from '../addproduct/addproduct.component';
import {MatButtonModule} from '@angular/material/button';
import { routes } from '../../app.routes';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent,HttpClientModule,SearchComponent,AddproductComponent,MatButtonModule, RouterModule,CommonModule,MatProgressSpinnerModule,MatIcon,MatBadgeModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  // changeDetection: ChangeDetectionStrategy.OnPush

})
export class HomeComponent implements OnInit{
  
  data: { title: string, /* other properties */ }[] = [];
  cartItemsCount=0;
  cartItemsData:any;
  filteredProduct:any[]= [];
  counter=0;
  heroImage!:any;
  heroData!:any;
  heroTitle!:any;
  heroPrice!:any;
  dataLength:any
productService=inject(ProductService)
handleCartDataFromChild(data:any){
  this.cartItemsCount=data;
}
buyProduct(event:any){
  console.log("Home cliked and customer wants to buy",event)
}
  keyword='';
  // constructor(private dataService: DataService) { }
  // url='https://fakestoreapi.com/products';
  async ngOnInit(): Promise<void> {
    this.productService.getProducts().subscribe((result)=>{
      console.log(result);
      this.data = result as any[];
      this.filteredProduct = this.data;
      this.dataLength=this.data.length;
      this.heroProductDisplay(this.dataLength);
    })
    // this.productService.getAddToCart().subscribe((cartItems:{ [key: string]: any }) => {
    //   let totalQuantity =  Object.values(cartItems).reduce((total, item) => total + item.quantity, 0);
    //   this.cartItemsCount=totalQuantity;
    // });
    // this.productService.getAddToCart().subscribe((result)=>{
    //   this.cartItemsData=result;
    // })
    // await fetch(this.url)
    //   .then((response) => response.json())
    //   .then((quotesData) => (this.data = quotesData))
    //   .then(() => {
    //     this.filteredProduct = this.data;
    //     console.log(this.filteredProduct);
    //   });
    //  setInterval(()=>(console.log(this.dataLength)),3000)
    setInterval(() => {
      this.heroProductDisplay(this.dataLength);
  }, 6000);
  
  }
  
  heroProductDisplay(length:any){
    // console.log(length)
    // console.log(this.counter)
    if(this.counter>=length){
      this.counter=0;
    }
    else{
      this.counter++;
    }
    this.heroData=this.data[this.counter];
    this.heroImage=this.heroData.image;
    this.heroTitle=this.heroData.title;
    this.heroPrice=this.heroData.price;
    // console.log(this.heroImage);
   
  }
  handleIncrement(){
    if(this.counter>=this.dataLength){
      this.counter++; 
    }
    else{
      this.counter=0;
    }
    // console.log(this.counter)
    this.heroProductDisplay(this.dataLength)
  }
  handleDecrement(){
    
    if(this.counter>=0){
      this.counter--; 
    }
    else{
      this.counter=this.dataLength;
    }
    this.counter--; 
    // console.log(this.counter)

    this.heroProductDisplay(this.dataLength)
  }
  onSearch(event:any){
    console.log(event);
    if(event){
      this.filteredProduct=this.data.filter(x=>x.title.toLowerCase().includes(event.toLowerCase()))
    }
    else{
      this.filteredProduct = this.data;
    }
  }
  
}
