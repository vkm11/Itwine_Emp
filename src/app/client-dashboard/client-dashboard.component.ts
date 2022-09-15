import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ClientService } from '../services/client.service';
import { Client } from '../models/client.model';


@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css']
})
export class ClientDashboardComponent implements OnInit {
  @ViewChild('fileInput') fileInput : any;
  clientForm !: FormGroup;
  clientModelObj : Client = new Client();

  constructor(private fb: FormBuilder,
    private api : ClientService) { }

    
  ngOnInit(): void {
    this.clientForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      date: [''],
      gender: [''],
      email: [''],
      address: [''],
      mobile: [''],
    })
    this.getAllClient();
  }
  getAllClient() {
    throw new Error('Method not implemented.');
  }
  clickAddClient(){
    this.clientForm.reset();
  }
  postClientDetails(){
    this.clientModelObj.firstName = this.clientForm.value.firstName;
    this.clientModelObj.lastName = this.clientForm.value.lastName;
    this.clientModelObj.date = this.clientForm.value.date;
    this.clientModelObj.mobile = this.clientForm.value.mobile;
    this.clientModelObj.profile = this.clientForm.value.profile;
    this.clientModelObj.email = this.clientForm.value.email;
    this.clientModelObj.gender = this.clientForm.value.gender;

    this.api.postClient(this.clientModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Employee added Successfully")
      let ref = document.getElementById("cancel")
      ref?.click();
      this.clientForm.reset();
      this.getAllClient();
    },
    err=>{
      alert("Something went wrong")
    })
  }
}


//   addClient(){
//     let client: Client = {
//       firstName: this.FirstName.value,
//       lastName: this.LastName.value,
//       date: this.Date.value,
//       email: this.Email.value,
//       mobile: this.Mobile.value,
//       gender: this.Gender.value,
//       address: this.Address.value,
//       profile: this.fileInput.nativeElement.files[0]?.name,
//     }
//     this.clientService.postClient(client).subscribe((res)=>{
//       this.clients.unshift(res);
//       this.clearForm();
//     })
//   }

//   clearForm(){
//     this.FirstName.setValue('');
//     this.LastName.setValue('');
//     this.Date.setValue('');
//     this.Gender.setValue('');
//     this.Email.setValue('');
//     this.Mobile.setValue('');
//     this.Address.setValue('');
//     this.fileInput.nativeElement.value='';
//   }

//   public get FirstName(): FormControl{
//     return this.clientForm.get('firstName') as FormControl;
//   }
//   public get LastName(): FormControl{
//     return this.clientForm.get('lastName') as FormControl;
//   }
//   public get Date(): FormControl{
//     return this.clientForm.get('date') as FormControl;
//   }
//   public get Gender(): FormControl{
//     return this.clientForm.get('gender') as FormControl;
//   }
//   public get Email(): FormControl{
//     return this.clientForm.get('email') as FormControl;
//   }
//   public get Mobile(): FormControl{
//     return this.clientForm.get('mobile') as FormControl;
//   }
//   public get Address(): FormControl{
//     return this.clientForm.get('address') as FormControl;
//   }
// }
