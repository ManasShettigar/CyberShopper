import { Component,Input,Output ,EventEmitter} from '@angular/core';
import { ProductService } from '../../product.service';
import { CommonModule } from '@angular/common';
import { SharedServiceService } from '../../shared-service.service';

// import { MatInputCounterModule } from '@angular-material-extensions/input-counter';

@Component({
  selector: 'app-cartproducts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cartproducts.component.html',
  styleUrl: './cartproducts.component.css'
})
export class CartproductsComponent {
  incBool=false;
  decBool=false;
constructor(private cartProducts: ProductService,private sharedService: SharedServiceService){}
@Input() product: any;
@Output() TotalPrice = new EventEmitter<any>();

handleDecrement(){
  if(this.product.quantity>=2){
    this.cartProducts.decreaseQuantity(this.product.id,1).subscribe(()=>{
      console.log("dec");
      this.TotalPrice.emit();
      this.sharedService.triggerFunction3();
    })
    // this.cartProducts.productExist(this.product.id).subscribe((result)=>{
    //   this.product=result
    //   this.TotalPrice.emit();
    //   // console.log(this.product)
    // })
  }

  if(this.product.quantity==0){
    this.decBool=true
  }

}
 
handleIncrement(){
this.cartProducts.updateQuantity(this.product.id,1).subscribe(()=>{
  console.log("inc");
  this.TotalPrice.emit();
  this.sharedService.triggerFunction3();

  // this.cartProducts.productExist(this.product.id).subscribe((result)=>{
  //   this.product=result
  // })
})
if(this.product.quantity>=1){
  this.decBool=false
}
  
  }

handleDelete(){
  this.cartProducts.deleteFromCart(this.product._id).subscribe(()=>{
    console.log('deleted')
    this.TotalPrice.emit();
    this.sharedService.triggerFunction3();

  })
}  
}