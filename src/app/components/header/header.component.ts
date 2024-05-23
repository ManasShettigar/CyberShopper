import { Component,inject,Input,Output,EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { SearchComponent } from '../search/search.component';
import { MatBadge, MatBadgeModule } from '@angular/material/badge';
import { MatIcon } from '@angular/material/icon';
import { ProductService } from '../../product.service';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { SharedServiceService } from '../../shared-service.service';
// import {AccountCircleIcon} from '@mui/icons-material/AccountCircle';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,SearchComponent,MatBadgeModule,MatIcon,MatBadge,MatButtonModule,MatButton],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private productService:ProductService,private sharedService: SharedServiceService){
    this.sharedService.triggerFunction3$.subscribe((data)=>{
      this.productService.getAddToCart().subscribe((cartItems:{ [key: string]: any }) => {
      let totalQuantity =  Object.values(cartItems).reduce((total, item) => total + item.quantity, 0);
      this.cartItemsCount=totalQuantity;
      });
    });
  }
  cartItemsCount!:string
  imagePath = 'assets/cybershopperlogo.png';
  keyword="";
  handleSearch(event:any){
  this.keyword=event;
  console.log(this.keyword)
  }
  // @Input() search:any
  // console.log(this.search)
//  @Input() 
  
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.productService.getAddToCart().subscribe((cartItems:{ [key: string]: any }) => {
      let totalQuantity =  Object.values(cartItems).reduce((total, item) => total + item.quantity, 0);
      this.cartItemsCount=totalQuantity;
    });
    
  }
}
