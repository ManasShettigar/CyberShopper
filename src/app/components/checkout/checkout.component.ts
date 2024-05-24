import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routes } from '../../app.routes';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../product.service';
// import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
// import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,MatButton,MatButtonModule,CommonModule,MatCardModule,MatTooltipModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  constructor(private productService: ProductService,private route:ActivatedRoute,private fb:FormBuilder){}
  data:any;
  productUserForm!: FormGroup;
  quantityVal:any;
  discountVal=0;
ngOnInit(): void {
  this.productUserForm = this.fb.group({
    id: ['', Validators.required],
    title: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', Validators.required],
    category: ['', Validators.required],
    image: ['', Validators.required],
    rate: [null, Validators.required],
    count: [null, Validators.required],
    email:['', Validators.required],
    userFirstName:['', Validators.required],
    userSecondName:['',Validators.required],
    address:['', Validators.required],
    number:['', Validators.required],
    city:['', Validators.required],
    pincode:['', Validators.required],
    country:['', Validators.required]
  // rating: this.fb.group({
  //     rate: [null, Validators.required],
  //     count: [null, Validators.required]
  //   })
  });
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.route.paramMap.subscribe(params => {
    console.log(params)
    const id = params.get('id');
    const quantityVal = params.get('quantity');
    if (!id) {
      console.log('id not found');
      return;
    }
    this.quantityVal=quantityVal;
    console.log(quantityVal)
    this.productService.getProductsDetail(id).subscribe((result) => {
      this.data = result;
      // this.imageVal=this.data.image
      console.log(this.data);
    });
  });
}
animeList=['naruto', 'onepiece',' bleach','fairytail','dragonballz'];
couponCode:any;
codeState=false
coupounInput(event:any){
    this.couponCode=event.target.value;
}

validateCode(){
  console.log(this.couponCode)
  console.log('clicked')
  if(this.animeList.includes(this.couponCode.toLowerCase().trim().replace(/\s+/g, ''))){
    console.log('match found')
    this.codeState=true
    this.discountVal=this.data.price*1.2
  }
}

addUserDetails(){

}
}
