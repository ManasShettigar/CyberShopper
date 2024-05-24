import { HttpClient } from '@angular/common/http';
import { Injectable,inject } from '@angular/core';
import { Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
httpClient=inject(HttpClient)
private apiResponseSubject: Subject<any> = new Subject<any>();

  constructor() { }
  getProducts(){
    return this.httpClient.get("http://localhost:3000/products")
 }
  
  // getProducts(){
  //    return this.httpClient.get("https://fakestoreapi.com/products")
  // }
  getProductsDetail(id: string){
    const url = `http://localhost:3000/products/${id}`;

    return this.httpClient.get(url)
  }
  addProduct(product:any) {
    console.log(product);
    return this.httpClient.post('http://localhost:3000/products', product);
  }
  // editProduct(product:any,id:any) {
  //   // console.log(product);
  //   return this.httpClient.patch(`http://localhost:3000/products/${id}`, product,id);
  // }
  deleteProduct(id:any){
    return this.httpClient.delete(`http://localhost:3000/products/${id}`, );
  }

  editProduct(product: any, id: any) {
    // Convert the product object to a JSON string
    const productJson = JSON.stringify(product);
  
    // Make a PUT request to update the product
    return this.httpClient.put(`http://localhost:3000/products/update/${id}`, productJson, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  // ADD To CART
  addToCart(product:any){
    // console.log(product);
    const url = `http://localhost:3000/addtocart`;
    return this.httpClient.post(url, product);
  }
  getAddToCart(){
    return this.httpClient.get("http://localhost:3000/addtocart")
  }
  deleteFromCart(id:any){
return this.httpClient.delete(`http://localhost:3000/addtocart/${id}`)
  }
  productExist(id: any) {
    const url = `http://localhost:3000/addtocartProduct/${id}`;
    return this.httpClient.get(url).pipe(
      catchError(error => {
        console.log('Product not found in the cart');
        return of(false); // Return false if product does not exist or on error
      })
    );
  }
  updateQuantity(id:any,counter:any){
    const url = `http://localhost:3000/addtocart/updateinc/${id}`;
    return this.httpClient.patch(url,{counter});
  }
  updateQuantityCounter(id:any,counter:any,product:any){
    const url = `http://localhost:3000/addtocart/updatecounter/${id}`;
    return this.httpClient.patch(url,{counter,product});
  }
  decreaseQuantity(id:any,counter:any){
    const url = `http://localhost:3000/addtocart/updatedec/${id}`;
    return this.httpClient.patch(url,{counter});
  }
}
