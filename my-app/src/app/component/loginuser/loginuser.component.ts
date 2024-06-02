import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegistersService } from '../../service/registers.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loginuser',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule ,
    CommonModule,
  ],
  templateUrl: './loginuser.component.html',
  styleUrl: './loginuser.component.scss'
})
export class LoginuserComponent {

  loginForm: FormGroup;
  public loader: boolean = false
  genders: any;
  formvalue: any;
  token: any;

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegistersService,
    private http: HttpClient,
  ){
    // this.initForm()
    this.loginForm = this.formBuilder.group({
      Username: ['', Validators.required],
      Name: ['', Validators.required],
      Password: ['', [Validators.required]],
    });
    this.loginForm.valueChanges.subscribe((data) => {
      console.log("data",data)
    })
  }

  ngOnInit(){
  }

  loginTheUser(){
    const payload = this.registerService.payload(this.loginForm.value)
    this.registerService.loginUser(payload).subscribe((res) => {
      console.log("user login sucessfully")
      this.token = res?.token
      sessionStorage.setItem("token", this.token);
    })
  }

}
