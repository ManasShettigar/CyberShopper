import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { AddproductComponent } from './components/addproduct/addproduct.component';
import { EditproductComponent } from './components/editproduct/editproduct.component';
import { AddtocartComponent } from './components/addtocart/addtocart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { PaymentComponent } from './components/payment/payment.component';

export const routes: Routes = [
    {path:"",
     component:HomeComponent},
    {path:"product/:title/:id",
     component:ProductDetailComponent},
     {
        path:"addproduct",
        component:AddproductComponent
     },
     {
      path:"editproduct/:id",
      component: EditproductComponent
     },
     {
      path:"addtocart",
      component:AddtocartComponent
     },
     {
      path:"checkout",
      component:CheckoutComponent
     },
     {
      path:"payment",
      component:PaymentComponent
     }
];
