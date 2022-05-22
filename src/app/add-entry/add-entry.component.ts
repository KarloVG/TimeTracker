import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { AddEntryService } from './services/add-entry.service';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.scss']
})
export class AddEntryComponent implements OnInit {

  entryGroup!: FormGroup;

  constructor(
    private addEntryService: AddEntryService,
    private formBuilder: FormBuilder,
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
    ) { 
      this._locale = 'fr';
      this._adapter.setLocale('fr');
    }
    
  ngOnInit(): void {
    this.setupFormGroup();
  }

  setupFormGroup(){
    this.entryGroup = this.formBuilder.group({
      date: new FormControl('', Validators.required),
      note: new FormControl('', Validators.required)
    })
  }

  onSubmit(){
    const date = this.entryGroup.controls['date'].value;
    const formatedDate = formatDate(date, 'yyyy-MM-dd', 'en-US');
    this.entryGroup.controls['date'].setValue(formatedDate);
    console.log(this.entryGroup.value)
    this.addEntryService.addEntry(this.entryGroup.value).subscribe();
  }

}
