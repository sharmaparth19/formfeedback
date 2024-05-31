import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Router } from 'express';
import { RegistersService } from '../../service/registers.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registeruser',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule ,
    CommonModule,
  ],
  templateUrl: './registeruser.component.html',
  styleUrl: './registeruser.component.scss'
})
export class RegisteruserComponent {

  registerForm: FormGroup;
  public loader: boolean = false
  genders: any;
  formvalue: any;

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegistersService,
    private http: HttpClient,
  ){
    // this.initForm()
    this.registerForm = this.formBuilder.group({
      Username: ['', Validators.required],
      Name: ['', Validators.required],
      Password: ['', [Validators.required]],
    });
    this.registerForm.valueChanges.subscribe((data) => {
      console.log("data",data)
    })
  }


  ngOnInit(){
  }

  initForm() {
    this.registerForm = this.formBuilder.group({
      Username: ['', Validators.required],
      Name: ['', Validators.required],
      Password: ['', [Validators.required]],
    });
  }

  registerTheUser(){
    const payload = this.registerService.payload(this.registerForm.value)
    this.registerService.registerUser(payload).subscribe((res) => {
      console.log("user register sucessfully")
    })
  }

}
