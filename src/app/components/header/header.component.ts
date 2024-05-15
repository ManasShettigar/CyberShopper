import { Component,inject } from '@angular/core';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { SearchComponent } from '../search/search.component';
import { MatBadge, MatBadgeModule } from '@angular/material/badge';
import { MatIcon } from '@angular/material/icon';
import { ProductService } from '../../product.service';
import { MatButton, MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,SearchComponent,MatBadgeModule,MatIcon,MatBadge,MatButtonModule,MatButton],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  productService=inject(ProductService)
  cartItemsCount!:string
  imagePath = 'assets/cybershopperlogo.png';
  onSearch(event:any){
    console.log(event); 
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.productService.getAddToCart().subscribe((cartItems:{ [key: string]: any }) => {
      let totalQuantity =  Object.values(cartItems).reduce((total, item) => total + item.quantity, 0);
      this.cartItemsCount=totalQuantity;
    });
    
  }
}
