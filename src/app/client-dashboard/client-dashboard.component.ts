import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { ClientService } from '../services/client.service';
import { clientModel } from '../models/client.model';


@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css']
})
export class ClientDashboardComponent implements OnInit {
  // @ViewChild('fileInput') fileInput : any;
  clientForm !: FormGroup;
  clientModelObj : clientModel = new clientModel();
  showAdd!: boolean;            // hide show
  showUpdate !: boolean;        // hide show
  // clientData: Client[] | undefined;
  clientData !: any;
  
  url="https://img.icons8.com/ios/2x/github.png"
  constructor(private fb: FormBuilder,
    private api : ClientService) { }

    
  ngOnInit(): void {
    this.clientForm = this.fb.group({
      firstName: new FormControl('',[Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
      
      lastName: ['',Validators.required],
      date: ['',Validators.required],
      gender: ['',Validators.required],
      email: ['',Validators.required],
      project: ['',Validators.required],
      address: ['',Validators.required],
      mobile: ['',Validators.required],
    })
    this.getAllClient();
  }
  clickAddClient(){
    this.clientForm.reset();
    this.showAdd = true;
    this.showUpdate=false;
  }
  postClientDetails(){
    this.clientModelObj.firstName = this.clientForm.value.firstName;
    this.clientModelObj.lastName = this.clientForm.value.lastName;
    this.clientModelObj.date = this.clientForm.value.date;
    this.clientModelObj.mobile = this.clientForm.value.mobile;
    // this.clientModelObj.profile = this.clientForm.value.profile;
    this.clientModelObj.email = this.clientForm.value.email;
    this.clientModelObj.project = this.clientForm.value.project;
    this.clientModelObj.gender = this.clientForm.value.gender;
    this.clientModelObj.address = this.clientForm.value.address;

    this.api.postClient(this.clientModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Client added Successfully")
      let ref = document.getElementById("cancel")
      ref?.click();
      this.clientForm.reset();
      this.getAllClient();
    },
    err=>{
      alert("Something went wrong")
    })
  }
  getAllClient(){
    this.api.getClient()
    .subscribe(res=>{
      this.clientData = res
    })
  }

  deleteClient(row : any){
    this.api.deleteClient(row.id)
    .subscribe(res=>{
      alert("Client Deleted")
      this.getAllClient();
    })
  }
  onEdit(row:any)
  {
    this.showAdd = false;
    this.showUpdate = true;
    this.clientModelObj.id = row.id;
    this.clientForm.controls['date'].setValue(row.date);

    this.clientForm.controls['firstName'].setValue(row.firstName);
    this.clientForm.controls['lastName'].setValue(row.lastName);
    this.clientForm.controls['email'].setValue(row.email);
    this.clientForm.controls['project'].setValue(row.project);
    this.clientForm.controls['mobile'].setValue(row.mobile);
    this.clientForm.controls["gender"].setValue(row.gender);
    this.clientForm.controls["address"].setValue(row.address);

  }
  updateClientDetails(){
    this.clientModelObj.date = this.clientForm.value.date;
    this.clientModelObj.firstName = this.clientForm.value.firstName;
    this.clientModelObj.lastName = this.clientForm.value.lastName;
    this.clientModelObj.email = this.clientForm.value.email;
    this.clientModelObj.project = this.clientForm.value.project;
    this.clientModelObj.mobile = this.clientForm.value.mobile;
    this.clientModelObj.gender = this.clientForm.value.gender;
    this.clientModelObj.address = this.clientForm.value.address;


    this.api.updateClient(this.clientModelObj, this.clientModelObj.id)
    .subscribe(res=>{
      alert("Updated Successfully")
      let ref = document.getElementById("cancel")
      ref?.click();
      this.clientForm.reset();
      this.getAllClient();
    })
  }
  // onSelect(event){
  //   if(event.target.files[0]){
  //     let reader = new FileReader();
  //     reader.readAsDataURL(event.target.files[0]);
  //     reader.onload=(event:any)=>{
  //       this.url = event.target.result;
  //     }
  //   }
  // }
 
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
