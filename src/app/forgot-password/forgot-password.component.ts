import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  //form Validation
  resetForm = this.fb.group({
    emailId: ['', Validators.required]
  })

  ngOnInit(): void {
  }

  onSubmit() { }

  //check the form validation
  isValid(control) {
    return this.resetForm.controls[control].invalid && this.resetForm.controls[control].touched;
  }
}
