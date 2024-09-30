import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private readonly DRIVER_KEY = 'driver';

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }


  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    
     return {};
  }
  


  setDriver(driver: any): void {
    localStorage.setItem(this.DRIVER_KEY, JSON.stringify(driver));
  }

  getDriver(): any {
    const driver = localStorage.getItem(this.DRIVER_KEY);
    return driver ? JSON.parse(driver) : null;
  }

  clearDriver(): void {
    localStorage.removeItem(this.DRIVER_KEY);
  }
}
