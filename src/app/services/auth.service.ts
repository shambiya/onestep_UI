import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';



const target_url = environment.endPoint;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logout() {
    throw new Error('Method not implemented.');
  }

 
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(target_url + 'api/authenticate/signin', {
      username,
      password
    }, httpOptions);
  }


  public createuser(userDto:any): Observable<any> {
    return this.http.post(target_url + 'user/create', userDto);
  }

  public getuserrole(): Observable<any> {
    return this.http.get(target_url + 'getrole');
  }


  public getalluser(): Observable<any> {
    return this.http.get(target_url + 'user/active');
  }

  // register(username: string, email: string,mobile :string, password: string): Observable<any> {
  //   return this.http.post(apiUrl + 'api/authenticate/signup', {
  //     username,
  //     email,
  //     mobile,
  //     password
  //   }, httpOptions);
  // }

  
}
