import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  readonly resourceUrl = "http://localhost:8080/api/accounts";

  isLoggedIn:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  login(req:any): Observable<any>{
    return this.http.post<any>(`${this.resourceUrl}/login`, req, {observe: 'response'});
  }

  register(req:any): Observable<any>{
    return this.http.post<any>(`${this.resourceUrl}/register`, req, {observe: 'response'});
  }
}
