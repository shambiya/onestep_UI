import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppEntity } from './appEntity.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private apiUrl = '/save/apps'; // Update with your actual backend URL if different

  constructor(private http: HttpClient) {}

  saveApp(appEntity: AppEntity): Observable<AppEntity> {
    return this.http.post<AppEntity>(this.apiUrl, appEntity);
  }
}
