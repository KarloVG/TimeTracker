import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { AddEntryService } from './services/add-entry.service';
import { formatDate } from '@angular/common';
import { DashboardService } from '../dashboard/services/dashboard.service';
import { ITable } from '../models/table';
import { IAttributes } from '../models/attributes';


@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.scss']
})
export class AddEntryComponent implements OnInit {

  entryGroup!: FormGroup;
  services!: ITable;

  constructor(
    private addEntryService: AddEntryService,
    private dashboardService: DashboardService,
    private formBuilder: FormBuilder,
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
    ) { 
      this._locale = 'fr';
      this._adapter.setLocale('fr');
    }
    
  ngOnInit(): void {
    this.setupFormGroup();
    this.getServices();
  }

  getServices() {
    this.dashboardService.getServices().subscribe(response => {this.services = response})
  }

  setupFormGroup(){
    this.entryGroup = this.formBuilder.group({
      date: new FormControl('', Validators.required),
      note: new FormControl('', Validators.required),
      id: new FormControl('')
    })
  }

  onSubmit(){
    // not finished
    const date = this.entryGroup.controls['date'].value;
    const formatedDate = formatDate(date, 'yyyy-MM-dd', 'en-US');
    this.entryGroup.controls['date'].setValue(formatedDate);
    this.addEntryService.addEntry(this.entryGroup.value).subscribe();
  }

}
