import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  datasource: any;

  @Output() searchInputChange: EventEmitter<string> = new EventEmitter();

  constructor( private router: Router) { }

  ngOnInit(): void {

  }

  searchKeyUp(event) {
    this.searchInputChange.emit(event.target.value);
  }

  addNewContact(): void {
    this.router.navigate(['/dodaj/']);;
  }

}
