import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  headers = new HttpHeaders({
    contentType: 'application/json',
    'Access-Control-Allow-Origin': '*',
  });
// se establece la URL de la API a consumir
  private apiURL = 'https://jsonplaceholder.typicode.com/users';


  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(this.apiURL);
  }
}
