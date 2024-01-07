import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class StudentService {


  private apiUrl = 'https://localhost:7019/api/student'

  
  constructor(private http: HttpClient) { }
  getStudents(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addStudent(student: any): Observable<any> {
    return this.http.post(this.apiUrl, student);
  }

  updateStudent(id: number, student: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, student);
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
