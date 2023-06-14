import { Component,ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { UserService } from './services/user.service';
import { CoreService } from './core/core.service';
import { OnInit } from '@angular/core';

import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title ="crud-app"

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'experience', 'company', 'dateOfBirth', 'education', 'gender','action']
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog,private _usersService: UserService, private coreService: CoreService) {}

  ngOnInit(): void{
    this.getUsers();
  }

  openAddEditEmpForm()
  {
    const dialogRef = this._dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) =>{
        if(val){
          this.getUsers();
        }
      }
    })
  }
 
  getUsers(){
    this._usersService.getUsers().subscribe({
      next: (res) =>{
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error:console.log,
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteUser(id: number){
    this._usersService.deleteUser(id).subscribe({
      next: (res) =>{
        console.log(res);
        this.coreService.openSnackBar('Felhasználó törölve', 'done');
        this.getUsers();
      },
      error:console.log,
    })
  }

  openEditForm(data: any)
  {
   const dialogRef = this._dialog.open(EmpAddEditComponent,{
      data 
    });
   
    dialogRef.afterClosed().subscribe({
      next: (val) =>{
        if(val){
          this.getUsers();
        }
      }
    })
  }
}


