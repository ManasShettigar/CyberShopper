import { Component } from '@angular/core';
import { SharedServiceService } from '../../shared-service.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  constructor(private sharedService:SharedServiceService,private route:ActivatedRoute){
   
  }
  data:any;
ngOnInit(): void {
  // const state = this.route.snapshot['_state'].data.state;
  const state = this.route.snapshot.data['state'];
  console.log(state)
  if (state) {
  console.log('Hello from the other side:', state.title);
  }
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  // const data = this.route.snapshot.firstChild?.data;
  // console.log(data); // this.dataBody;
  // console.log(this.route.snapshot.paramMap)
  // this.route.paramMap.subscribe(params => {
  //   const id = params.get('id');
  //   console.log(params)})
    // const quantity = params.get('quantity');
    // if(quantity){
    //   this.quantityVal=parseInt(quantity, 10);;
    // }
    // if (!id) {
    //   console.log('id not found');
    //   return;

    
  // const state = this.route.snapshot.paramMap.get('state');
  // if (state) {
  //   console.log('entered')
  //   const stateData = JSON.parse(state);
  //   if (stateData) {
  //     console.log('Hello from the other side:', stateData.title);
  //   }
  // }
  // this.data=data;
  // this.sharedService.triggerFunction4$.subscribe((result)=>{
  //   this.data=result
  //   console.log(this.data)
  // })
  console.log( this.data)
  // console.log( this.data)
}
}
