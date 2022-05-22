import { formatDate } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';

import {MatTableDataSource} from '@angular/material/table';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import { AddEntryComponent } from '../add-entry/add-entry.component';
import { DeleteEntryComponent } from '../delete-entry/delete-entry.component';
import { ITable } from '../models/table';
import { DashboardService } from './services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['id', 'date', 'time', 'note', 'actions'];
  today = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  dataSource = new MatTableDataSource<any>();
  dataEntries!: ITable;
  subscription!: Subscription;
  isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(
    private dashboardService: DashboardService,
    private matDialog: MatDialog) { }
  

  ngOnInit(): void {
    console.log(this.today)
    this.getTimeEntries();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  getTimeEntries() {
    this.isLoading$.next(true);
    this.subscription = this.dashboardService.getTimeEntries().subscribe(data => {
      this.dataSource.data = data.data.filter(data => data.date === this.today);
      this.isLoading$.next(false)
    })
  }

  addEntry(){
    const dialogRef = this.matDialog.open(AddEntryComponent, {
      disableClose: true,
      width: '300px'
    })
    dialogRef.afterClosed().subscribe(() => {
      this.getTimeEntries();
    })
  }

  deleteEntry(row: string){
    const dialogRef = this.matDialog.open(DeleteEntryComponent, {
      disableClose: true,
      data: row
    })
    dialogRef.afterClosed().subscribe(() => {
      this.getTimeEntries();
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
