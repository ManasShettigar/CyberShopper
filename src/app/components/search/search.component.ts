import { Component, EventEmitter, Output} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../product.service';
import { SharedServiceService } from '../../shared-service.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatInputModule,MatIconModule,MatButtonModule,CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  constructor ( private dataService : ProductService, private sharedService:SharedServiceService){}
  data:any;
  keyword:String="";
  filteredProduct:any
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.dataService.getProducts().subscribe((result)=>{
        this.data=result;
    })
    
  }
onSearch(event:any){
this.keyword=event.target.value;
if(this.keyword.length==0){
  this.sharedService.triggerFunction2();
}
// console.log(this.keyword)
}
onClear(){
  // console.log('I am clicked')
this.sharedService.triggerFunction2();
this.keyword='';
}
@Output() search =new EventEmitter<any>;
searchKeyword(){
  this.search.emit(this.keyword);
  // this.filteredProduct=this.data.filter((x: any)=>x.title.toLowerCase().includes(this.keyword.toLowerCase()))
  this.sharedService.triggerFunction1(this.keyword);
  // this.keyword="";
  // console.log(this.filteredProduct)
}
}

