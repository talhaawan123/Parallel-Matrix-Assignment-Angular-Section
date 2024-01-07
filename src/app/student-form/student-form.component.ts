import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { FormBuilder, FormGroup , FormArray  ,  FormControl} from '@angular/forms';
@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  studentForm: FormGroup;

  constructor(private fb: FormBuilder, private studentService: StudentService) {
    this.studentForm = this.fb.group({
      name: [''],
      rollNo: [''],
      class: [''],
      addresses: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    // Add an initial address field
    this.addAddress();
  }

  addAddress(): void {
    const addressGroup = this.fb.group({
      street: [''],
      city: [''],
    });

    // Add the address group to the form array
    this.addresses.push(addressGroup);
  }

  removeAddress(index: number): void {
    // Remove the address group at the specified index
    this.addresses.removeAt(index);
  }

  get addresses(): FormArray {
    return this.studentForm.get('addresses') as FormArray;
  }

  addStudent(): void {
    const newStudent = this.studentForm.value;
    this.studentService.addStudent(newStudent).subscribe(
      (data) => {
        console.log('Student added successfully', data);
        // Reset the form after successful submission
        this.studentForm.reset();
        this.addresses.clear(); // Clear the addresses form array
        this.addAddress(); // Add a new empty address field
      },
      (error) => {
        console.error('Error adding student', error);
      }
    );
  }

  getFormControl(controlName: string, addressGroup: FormGroup): FormControl {
    return addressGroup.get(controlName) as FormControl;
  }

}
