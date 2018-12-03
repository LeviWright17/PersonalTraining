import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ApiService {
  private apiEndpoint: String = '/api';
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  constructor(private http: HttpClient) {
  }

  get(path) {
    const response = this.http.get(`${this.apiEndpoint}${path}`, { headers: this.headers });
    return response;
  }

  post(path) {
    const response = this.http.get(`${this.apiEndpoint}${path}`, { headers: this.headers });
    return response;
  }
}
