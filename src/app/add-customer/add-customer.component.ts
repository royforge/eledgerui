import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent {

  //numericRegex = "^[a-zA-Z0-9]+$";

  customerForm = this.fb.group({
    name: ['', Validators.required],
    mobile: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) { }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.customerForm.value);
  }

}
