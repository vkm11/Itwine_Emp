import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public signinForm!: FormGroup
  constructor(private formBuilder : FormBuilder,
    private http : HttpClient, 
    private router : Router) { }

  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }
  signIn(){
    this.http.get<any>("http://localhost:3000/signupUser")
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.email === this.signinForm.value.email && a.password === this.signinForm.value.password
      });
      if(user){
        alert("SignIn Success !!!")
        this.signinForm.reset();
        // this.router.navigate(['dashboard'])
        this.router.navigate(['home'])
      }else{
        alert("user not found")
      }
    },err=>{
      alert("Something went wrong")
    })
  }
}
