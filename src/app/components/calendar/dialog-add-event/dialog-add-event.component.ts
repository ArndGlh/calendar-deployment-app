import { NgxMatDateAdapter, NgxMatDateFormats, NGX_MAT_DATE_FORMATS } from '@angular-material-components/datetime-picker';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomNgxDatetimeAdapter } from 'src/app/models/customDateAdapter';
import { NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular-material-components/moment-adapter';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Application, Author, Environment } from 'src/app/models/event.model';

const CUSTOM_DATE_FORMATS: NgxMatDateFormats = {
  parse: {
    dateInput: 'l, LTS',
  },
  display: {
    dateInput: 'DD / MM / YYYY à HH:mm',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-dialog-add-event',
  templateUrl: './dialog-add-event.component.html',
  styleUrls: ['./dialog-add-event.component.scss'],
  providers: [
    {
      provide: NgxMatDateAdapter,
      useClass: CustomNgxDatetimeAdapter,
      deps: [MAT_DATE_LOCALE, NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
  ]
})
export class DialogAddEventComponent implements OnInit {

  public formGroup!: FormGroup;

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogAddEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data);
    this.formGroup = this.fb.group({
      title: [''],
      start: [''],
      end: [''],
      application: [''],
      environment: [''],
      author: ['']
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.formGroup.value.title = this.data.authors.find((el:Author) => el.idAuthor === this.formGroup.value.author).author + ' '
    + this.data.applications.find((el:Application) => el.idApplication === this.formGroup.value.application).application + ' '
    + this.data.environments.find((el:Environment) => el.idEnvironment === this.formGroup.value.environment).environment;

    this.dialogRef.close(this.formGroup.value);
  }
}
