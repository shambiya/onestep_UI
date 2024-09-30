import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AppEntity } from 'src/app/services/appEntity.model';
import { AppService } from 'src/app/services/appService.service';


@Component({
  selector: 'app-add-app',
  templateUrl: './add-app.component.html',
  styleUrls: ['./add-app.component.css']
})
export class AddAppComponent implements OnInit {

  appForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddAppComponent>,
    private appService: AppService
  ) {
    this.appForm = this.fb.group({
      appName: ['', Validators.required],
      appLink: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Initialization logic if needed
  }

  onSave() {
    if (this.appForm.valid) {
      const appData: AppEntity = this.appForm.getRawValue();
      console.log('App Data:', appData);
      this.appService.saveApp(appData).subscribe(
        response => {
          console.log('App saved successfully:', response);
          this.dialogRef.close(response); // Close the dialog and pass the response
        },
        error => {
          console.error('Error saving app:', error);
        }
      );
    }
  }

  onClose() {
    this.dialogRef.close();
  }
}
