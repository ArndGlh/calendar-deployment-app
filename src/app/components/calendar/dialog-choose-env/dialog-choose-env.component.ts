import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-choose-env',
  templateUrl: './dialog-choose-env.component.html',
  styleUrls: ['./dialog-choose-env.component.scss']
})
export class DialogChooseEnvComponent implements OnInit {

  public formGroup!: FormGroup;

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogChooseEnvComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data);
    this.formGroup = this.fb.group({
      application: [''],
      environment: ['']
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close(this.formGroup.value);
  }
}
