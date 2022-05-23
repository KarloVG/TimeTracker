import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteEntryService } from './services/delete-entry.service';

@Component({
  selector: 'app-delete-entry',
  templateUrl: './delete-entry.component.html',
  styleUrls: ['./delete-entry.component.scss']
})
export class DeleteEntryComponent implements OnInit {

  constructor(
    private deleteEntryService: DeleteEntryService,
    private dialog: MatDialogRef<DeleteEntryComponent>,
    @Inject(MAT_DIALOG_DATA) public row: string
  ) { }

  // eslint-disable-next-line
  ngOnInit(): void {
  }

  deleteEntry(id: string){
    this.deleteEntryService.deleteEntry(id).subscribe(() => this.dialog.close());
}

}
