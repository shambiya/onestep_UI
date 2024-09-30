import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-lead',
  templateUrl: './add-lead.component.html',
  styleUrls: ['./add-lead.component.css']
})
export class AddLeadComponent implements OnInit {

  leadForm: FormGroup; // Updated form group name

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddLeadComponent>) { // Corrected type
    this.leadForm = this.fb.group({
      empName: ['', Validators.required],
      empId: ['', Validators.required],
      role: [{ value: 'ROLE_LEAD', disabled: true }], // Updated role value
    });
  }

  ngOnInit(): void {
    // Initialization logic if needed
  }

  onSave() {
    if (this.leadForm.valid) {
      const leadData = this.leadForm.getRawValue();
      console.log('Lead Data:', leadData);
      // Save logic here
    }
  }

  onClose() {
    this.dialogRef.close(); // Close the dialog
  }
}
