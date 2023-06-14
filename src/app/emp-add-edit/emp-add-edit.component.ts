import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css']
})
export class EmpAddEditComponent implements OnInit {
empForm: FormGroup;

  education: string[] = [
    'Érettségi',
    'Középfokú végzettség',
    'Egyetem',
  ]

  constructor(private _fb: FormBuilder, private _usersService: UserService, private _dialogRef: MatDialogRef<EmpAddEditComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private _coreService: CoreService ) {
    this.empForm = this._fb.group({
      firstName: "",
      lastName: "",
      email: "",
      dateOfBirth: "",
      gender: "",
      education: "",
      company: "",
      experience: "",
    })
  }

  ngOnInit(): void {
    if (this.data) {
      this.empForm.patchValue(this.data);
    }
  }
  onFormSubmit(){
    if(this.empForm.valid){
      if(this.data){
        console.log(this.empForm.value);
        this._usersService.updateUser(this.data.id, this.empForm.value).subscribe({
          next: (val: any) =>{
            this._coreService.openSnackBar('Munkavállaló frissítve')
            this._dialogRef.close(true);
          },
          error: (err: any) =>{
            console.error(err);
          }
        })
      } else {
        console.log(this.empForm.value);
        this._usersService.addUser(this.empForm.value).subscribe({
          next: (val: any) =>{
            this._coreService.openSnackBar('Munkavállaló hozzáadva')
            this._dialogRef.close(true);
          },
          error: (err: any) =>{
            console.error(err);
          }
        })
      }
    }
  }
}
