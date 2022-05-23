import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Output() closeSidenav = new EventEmitter<void>();

  constructor() { }

  // eslint-disable-next-line
  ngOnInit(): void {
  }
  
  onClose() {
    this.closeSidenav.emit();
  }

}
