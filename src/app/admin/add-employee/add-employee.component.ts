import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  employeeForm: FormGroup;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddEmployeeComponent>) {
    this.employeeForm = this.fb.group({
      empName: ['', Validators.required],
      empId: ['', Validators.required],
      role: [{ value: 'ROLE_EMPLOYEE', disabled: true }],
      leadId: ['', Validators.required]
    });
  }

  onSave() {
    if (this.employeeForm.valid) {
      const employeeData = this.employeeForm.getRawValue();
      console.log('Employee Data:', employeeData);
      // Save logic here
    }
  }

  onClose() {
    this.dialogRef.close(); // Close the dialog
  }
}
