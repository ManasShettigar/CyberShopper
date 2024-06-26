import { Component, Sanitizer } from '@angular/core';
import { ProductService } from '../../product.service';
import { ActivatedRoute,ParamMap, RouterLink } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {MatIconRegistry,MatIconModule} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import { SharedServiceService } from '../../shared-service.service';
import { CheckoutComponent } from '../checkout/checkout.component';
const Delete_ICON =
`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
`;
@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [MatProgressSpinnerModule,MatIconModule,CommonModule,FontAwesomeModule,RouterLink,CheckoutComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  data:any;
  // imageVal= null;
  pinCodeRegex=/^[1-9][0-9]{5}$/
  // randomNumber = Math.floor(Math.random() * (10)) + 1;
  deliveryDate:any;
  pinCodeEntered=false;
  pinCode:any;
  pinValid=false;
  constructor(private productService: ProductService,private sharedService:SharedServiceService,private route: ActivatedRoute,iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {  iconRegistry.addSvgIconLiteral('delete-icon', sanitizer.bypassSecurityTrustHtml(Delete_ICON));};
 faTrash=faTrash;
  faPenToSquare=faPenToSquare;
  incBool= false
  decBool= true
  quantityVal=1;
  handleIncrement(){
    this.quantityVal++;
    this.decBool=false
  }
  handleDecrement(){
    if(this.quantityVal!=1){
      this.quantityVal--;
      if(this.quantityVal==1){
        this.decBool=true
      }
    }
  }
  pinCodeVerify(event:any){
    if (event.target.value.length <= 6) {
      this.pinCode =event.target.value ;
      console.log(this.pinCode);
    } else {
      event.target.value = this.pinCode;
      return; 
    }
    const valid=this.pinCodeRegex.test(this.pinCode)
    if(valid){
      // console.log(this.pinCode)
      this.pinCodeEntered=true
      this.deliveryDate=Math.floor(Math.random() * (10)) + 1
      this.pinValid=true;

    }
    else{
      if(this.pinCode.length<=6){
        this.pinValid=false;
      }
      
      this.pinCodeEntered=false
    }
    // console.log(this.pinCodeEntered)
  }
  addToCart(){
    this.productService.updateQuantityCounter(this.data.id,this.quantityVal,this.data).subscribe(()=>{
        console.log("Added to Cart")
        this.sharedService.triggerFunction3();

    })
  }
  buyNow(){
    this.productService.updateQuantityCounter(this.data.id,this.quantityVal,this.data).subscribe(()=>{
      console.log("Added to Cart")
      this.sharedService.triggerFunction3();
  })
  
  }
  handleDelete(){
    this.productService.deleteProduct(this.data._id).subscribe(()=>{
      console.log("Deleted sucessfully");
    })
  }
  ngOnInit(): void {
    // console.log("init has started");
   
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log(params)
      const quantity = params.get('quantity');
      if(quantity){
        this.quantityVal=parseInt(quantity, 10);;
      }
      if (!id) {
        console.log('id not found');
        return;
      }

      this.productService.getProductsDetail(id).subscribe((result) => {
        this.data = result;
        // this.imageVal=this.data.image
        console.log(this.data);
      });
    });
  }
}
