import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  
  jeUlogiran: boolean = false;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {

    //provjeri jeli ulogiran
    this.jeUlogiran = this.accountService.jeUlogiran;

  }

}
