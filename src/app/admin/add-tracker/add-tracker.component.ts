import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-tracker',
  templateUrl: './add-tracker.component.html',
  styleUrls: ['./add-tracker.component.css']
})
export class AddTrackerComponent implements OnInit {

  trackerForm: FormGroup; // Updated form group name

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddTrackerComponent>) { // Corrected type
    this.trackerForm = this.fb.group({
      appName: ['', Validators.required],
      appLink: ['', Validators.required],
      // Updated role value
    });
  }

  ngOnInit(): void {
    // Initialization logic if needed
  }

  onSave() {
    if (this.trackerForm.valid) {
      const leadData = this.trackerForm.getRawValue();
      console.log('Lead Data:', leadData);
      // Save logic here
    }
  }

  onClose() {
    this.dialogRef.close(); // Close the dialog
  }
}
