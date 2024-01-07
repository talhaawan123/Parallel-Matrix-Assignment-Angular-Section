import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit{
  students: any[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe(
      (data) => {
        this.students = data;
        console.log('Students loaded successfully', data);
      },
      (error) => {
        console.error('Error loading students', error);
      }
    );
  }

  deleteStudent(id: number): void {
    this.studentService.deleteStudent(id).subscribe(
      () => {
        console.log('Student deleted successfully');
        // Refresh the list after deletion
        this.loadStudents();
      },
      (error) => {
        console.error('Error deleting student', error);
      }
    );
  }
}
