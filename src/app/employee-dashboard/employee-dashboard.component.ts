import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceApiService } from '../services/service-api.service';
import { EmployeeModel } from './employee-dash board.model';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
 
  formValue !: FormGroup
  employeeModelObj : EmployeeModel = new EmployeeModel();
  employeeData !: any;

  showAdd!: boolean;            // hide show
  showUpdate !: boolean;        // hide show
  
  constructor(private formbuilder: FormBuilder,
    private api : ServiceApiService) { }


// Export to PDF File
  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('employeeData.pdf');
    });
  }


  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      // date:["",Validators.required ],
      date: new FormControl ('',[Validators.required]),
      // firstName :["",Validators.required],
      // lastName :["",Validators.required],
      // email :["",Validators.required,],
      firstName: new FormControl('',[Validators.required,
        Validators.minLength(3), Validators.maxLength(35), Validators.pattern("[a-zA-Z].*")]),
  
      lastName : new FormControl('',[Validators.required,
        Validators.minLength(3), Validators.maxLength(30), Validators.pattern("[a-zA-Z].*")]),
      
      email: new FormControl('',[Validators.required, Validators.email]),
      
      // mobile :["",Validators.required], 
      mobile: new FormControl ('',[Validators.required,
        Validators.maxLength(10), Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      // salary :["",Validators.required],
      salary: new FormControl ('',[Validators.required, Validators.maxLength(20),
         Validators.pattern(/^[0-9]{1,15}$/)]),
     
    })
    this.getAllEmployee();     //call api
  }
  clickAddEmployee(){
    this.formValue.reset();   // hide add show update button
    this.showAdd = true;
    this.showUpdate=false;
  }
  postEmployeeDetails(){
    this.employeeModelObj.date = this.formValue.value.date;
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;
 
    this.api.postEmployee(this.employeeModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Employee added Successfully")
      let ref = document.getElementById("cancel")
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },
    err=>{
      alert("Something went wrong")
    })
  }
  getAllEmployee(){
    this.api.getEmployee()
    .subscribe(res=>{
      this.employeeData = res
    })
  }
  deleteEmployee(row : any){
    this.api.deleteEmployee(row.id)
    .subscribe(res=>{
      alert("Employee Deleted")
      this.getAllEmployee();
    })
  }
  onEdit(row:any)
  {
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelObj.id = row.id;
    this.formValue.controls['date'].setValue(row.date);

    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
  }
  updateEmployeeDetails(){
    this.employeeModelObj.date = this.formValue.value.date;
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
    .subscribe(res=>{
      alert("Updated Successfully")
      let ref = document.getElementById("cancel")
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    })
  }
}
