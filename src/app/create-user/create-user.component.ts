import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  hostName: string;
  profileUrl: string;
  userEmail: string;
  isUrlEnable: boolean = false;

  myform: FormGroup;
  displayName: FormControl;
  email: FormControl;
  mobile: FormControl;
  age: FormControl;


  createForm() {
    this.myform = this.formBuilder.group({
      displayName: this.displayName,
      email: this.email,
      mobile: this.mobile,
      age: this.age
    });
  }

  constructor(private formBuilder: FormBuilder,
    public userAuthService: UserService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.createForm();
  }

  saveUser() {
    this.userAuthService.saveUser(this.myform.value).then(res => {
      this.getUser(this.myform.value.email);
      this.myform.reset();
    }).catch(function (error) {
      console.error("Error writing document: ", error);
    });
  }

  getUser(email: string) {
    this.isUrlEnable = true;
    this.userEmail = email;
    this.profileUrl = "Profile Url";
  }

}
