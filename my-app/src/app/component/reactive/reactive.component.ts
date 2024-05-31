import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from './reactive.field';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveService } from '../../service/reactive.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PopupComponent } from '../popup/popup.component';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-reactive',
  standalone: true,
  imports: [
    ReactiveFormsModule ,
    CommonModule,
    HttpClientModule,
  ],
  templateUrl: './reactive.component.html',
  styleUrl: './reactive.component.scss',
  providers: [ HttpClientModule]

})
export class ReactiveComponent {

  userForm: any = FormGroup;
  public loader: boolean = false
  genders: any;
  formvalue: any;
  showPopup = false;
  popupTitle = 'Welcome!';
  popupMessage = 'This is a popup message.';
  
  constructor(
    private formBuilder: FormBuilder,
    private reactiveService: ReactiveService,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(){
    this.initForm()
    this.fetchGender()
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Age: ['', Validators.required],
      gender: ['', [Validators.required]],
      Category: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const userData: User = this.userForm.value;
      console.log('Form submitted', userData);
    } else {
      console.log('Form is invalid');
    }
  }

  fetchGender() {
    this.loader = true;
    this.reactiveService.getGender().subscribe((response) => {
      this.loader = false;
      this.genders = response.map((item: { gender: any; }) => item.gender);
    });
  }

  posttheFeedback(){
    const payload = this.reactiveService.payload(this.userForm.value)
    this.reactiveService.postFeedback(payload).subscribe((res) => {
      console.log("Sucessfully posted")
      this.router.navigate(['showdata']); // Navigate to the ReactiveComponent
    })
  }


}
