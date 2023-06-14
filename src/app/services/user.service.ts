import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl="/api/users"

  addUser=(user:UserModel): Observable<any>=>
  {
    return this.http.post(this.baseUrl,user);
  }

  updateUser=(id : number, user:UserModel): Observable<any>=>
  {
    return this.http.put(`${this.baseUrl}/${id}`,user, );
  }

  getUsers=(): Observable<any>=>
  {
    return this.http.get(this.baseUrl);
  
  }

  deleteUser=(id: number): Observable<any> =>
  {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getById= (id:number)=> this.http.get<UserModel>(this.baseUrl+`/${id}`)
  delete= (id:number)=> this.http.delete<any>(this.baseUrl+`/${id}`)

  constructor(private http:HttpClient) { }
}
