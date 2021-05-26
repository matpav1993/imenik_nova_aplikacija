import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-popis-kontakta',
  templateUrl: './popis-kontakta.component.html',
  styleUrls: ['./popis-kontakta.component.scss']
})
export class PopisKontaktaComponent implements OnInit, AfterViewInit {
  [x: string]: any;
  api: ApiService;

  displayedColumns: string[] = ['ime', 'prezime'];
  dataSource: MatTableDataSource<any>;
  SviKontakti: any;
  Kontakti: any;
  Telefon: any;



  constructor(private ApiService: ApiService, private router: Router, public dialog: MatDialog) { }

  ngAfterViewInit(): void {
  }


  ngOnInit() {
    this.getContactsWithPhones();
  }

  searchInputChange(keyword) {
    this.Kontakti = this.SviKontakti
      .filter(kontakt => kontakt.ime.toLowerCase().includes(keyword.toLowerCase()) ||
        kontakt.prezime.toLowerCase().includes(keyword.toLowerCase()));

  }

  getContactsWithPhones() {

    forkJoin({
      kontakti: this.ApiService.getKontakti(),
      telefoni: this.ApiService.getTelefoni()
    }).subscribe(x => {
      x.kontakti.forEach(kontakt => {
        kontakt.telefoni = x.telefoni.filter(tel => tel.kontakti_id === kontakt.id);
      });

      this.Kontakti = x.kontakti;
      this.SviKontakti = x.kontakti;
    });

  }
}