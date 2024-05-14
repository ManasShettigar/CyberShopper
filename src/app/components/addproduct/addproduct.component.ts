import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../product.service'; // Adjust the path as per your project structure
import { CommonModule } from '@angular/common';
// import { ToastrService } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';



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
  selector: 'app-addproduct',
  standalone: true,
  imports:[ReactiveFormsModule,CommonModule,ToastrModule],
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  productForm!: FormGroup;
  dataBody: any[] = [];
  toastShow: boolean= false;
  constructor(private fb: FormBuilder, private productService: ProductService) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
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
    // console.log(this.productForm.controls);
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
    this.showSuccess("Product added successfully");

    console.log(this.productForm.controls);

    if (this.productForm.valid) {
      
      // console.log(this.productForm.controls);
      // console.log(this.productForm.value);
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
      console.log(this.dataBody)

      // Process the form data (e.g., send it to the server)
      this.productService.addProduct(this.dataBody).subscribe(
        () => {
          console.log('Product added successfully');
          this.showSuccess("Product added successfully");
          // Reset the form after successful submission
          this.productForm.reset();

        },
        (error) => {
          console.error('Error adding product:', error);
        }
      );
    }
  }
}
