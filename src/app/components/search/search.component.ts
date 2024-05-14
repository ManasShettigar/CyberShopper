import { Component, EventEmitter, Output} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatInputModule,MatIconModule,MatButtonModule,CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  keyword="";
onSearch(event:any){
this.keyword=event.target.value;

}
@Output() search =new EventEmitter<any>;
searchKeyword(){
  this.search.emit(this.keyword);
  this.keyword="";
}
}

