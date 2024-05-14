import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../product.service'; // Adjust the path as per your project structure
import { CommonModule } from '@angular/common';
// import { ToastrService } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { response } from 'express';

interface ProductFormValues {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

@Component({
  selector: 'app-editproduct',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './editproduct.component.html',
  styleUrl: './editproduct.component.css'
})
export class EditproductComponent implements OnInit {
  presetValues!:any
    data!:any;
    productForm!: FormGroup;
    dataBody: any[] = [];
    toastShow: boolean= false;
    constructor(private fb: FormBuilder, private productService: ProductService,private route: ActivatedRoute) { }
    id:any;
     async ngOnInit(): Promise< void> {
       this.route.paramMap.subscribe(params => {
         this.id = params.get('id');
         console.log(this.id);
         if (!this.id) {
           console.log('id not found');
           return;
          }})
          this.data={};
          // console.log(this.productForm.controls);
          this.productService.getProductsDetail(this.id).subscribe((response)=>{
            
            this.data= response;
            this.presetValues = {
              id: this.data.id,
              title:this.data.title,
              description:this.data.description,
              price: this.data.price,
              category: this.data.category,
              image:this.data.image,
              rate:this.data?.rating?.rate,
              count:this.data?.rating?.count,                  
            };
            this.productForm.setValue(this.presetValues);
            // console.log(this.data);
            // console.log(this.data.id);
          })
           this.productForm = this.fb.group({
            id: [{ value: this.data.id, disabled: true }, Validators.required],
            title: [this.data.title, Validators.required],
            description: ['', Validators.required],
            price: ['', Validators.required],
            category: ['', Validators.required],
            image: ['', Validators.required],
            rate: [null, Validators.required],
            count: [null, Validators.required]
            
          // rating: this.fb.group({
          //     rate: [null, Validators.required],
          //     count: [null, Validators.required]
          //   })
          });

         
          // console.log("next part");
          // console.log(presetValues)
          
    }
    showSuccess(msg:string) {
      // this.toastService.success(msg, 'Toastr fun!');
      this.toastShow=!this.toastShow;
      console.log(this.toastShow);
      setTimeout(()=>{
        this.toastShow=!this.toastShow;
      },3000)
    }
    togglecloseShow(): void {
      this.toastShow = !this.toastShow;
    }
    onSubmit() {
     

      // console.log(this.productForm.controls);
      // console.log(this.productForm.value);


      if (this.productForm.valid) {
        
        // console.log(this.productForm.controls);
        this.dataBody=[ {
          id: this.productForm.value.id,
          title: this.productForm.value.title,
          description: this.productForm.value.description,
          price: this.productForm.value.price,
          category: this.productForm.value.category,
          image: this.productForm.value.image,
          rating: {
            rate: this.productForm.value.rate,
            count: this.productForm.value.count,
          }
        }]
        // console.log(this.dataBody)
        
        // // Process the form data (e.g., send it to the server)
        // this.productService.editProduct(this.dataBody,this.id).subscribe(
          //   () => {
            //     console.log('Product added successfully');
            // this.showSuccess("Product added successfully");
            //     this.showSuccess("Product added successfully");
        //     // Reset the form after successful submission
        //     this.productForm.reset();
  
        //   },
        //   (error) => {
        //     console.error('Error adding product:', error);
        //   }
        // );
        this.productService.editProduct(this.dataBody, this.data._id).subscribe(
          () => {
            console.log('Product updated successfully');
            this.showSuccess("Product updated successfully");
            // Reset the form after successful submission
            this.productForm.reset();
          },
          (error) => {
            console.error('Error updating product:', error);
          }
        );
      }
    }
  }
  

