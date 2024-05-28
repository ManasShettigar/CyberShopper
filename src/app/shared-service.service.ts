import { Injectable } from '@angular/core';
// import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// @Injectable()
@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  constructor() { }
  private triggerFunctionSource1 = new Subject<any>();
  private triggerFunctionSource2 = new Subject<any>();
  private triggerFunctionSource3 = new Subject<any>();
  private triggerFunctionSource4 = new Subject<any>();
  triggerFunction1$ = this.triggerFunctionSource1.asObservable();
  triggerFunction2$ = this.triggerFunctionSource2.asObservable();
  triggerFunction3$ = this.triggerFunctionSource3.asObservable();
  triggerFunction4$ = this.triggerFunctionSource4.asObservable();

  triggerFunction1(data: any) {
    this.triggerFunctionSource1.next(data);
  }
  triggerFunction2(){
    this.triggerFunctionSource2.next('clear');
  }
  triggerFunction3(){
    this.triggerFunctionSource3.next('calculate');
  }
  triggerFunction4(data: any) {
    this.triggerFunctionSource4.next(data);
  }
}
