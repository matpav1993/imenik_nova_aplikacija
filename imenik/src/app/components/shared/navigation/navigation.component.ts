import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  jeUlogiran: boolean = false;
  datasource: any;

  @Output() searchInputChange: EventEmitter<string> = new EventEmitter();

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {

    //provjeri jeli ulogiran
    this.jeUlogiran = this.accountService.jeUlogiran;
  }

  searchKeyUp(event) {
    this.searchInputChange.emit(event.target.value);
  }

  addNewContact(): void {
    this.router.navigate(['/dodaj/']);;
  }

}