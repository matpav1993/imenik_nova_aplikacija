import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
// import { KontaktiService } from 'src/app/services/kontakti.service';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/api.service';
import { Kontakt } from 'src/app/models/kontakt.model';

@Component({
  selector: 'app-popis-kontakta',
  templateUrl: './popis-kontakta.component.html',
  styleUrls: ['./popis-kontakta.component.scss']
})
export class PopisKontaktaComponent implements OnInit, AfterViewInit {
  [x: string]: any;
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
  api: ApiService;

  displayedColumns: string[] = ['ime', 'prezime'];
  dataSource: MatTableDataSource<any>;
  Kontakti: any;
  Telefon: any;



  constructor(private ApiService: ApiService , private router: Router, public dialog: MatDialog) { }

  ngAfterViewInit(): void {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  }


  ngOnInit(): void {
    this.ApiService.getKontakti().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
      this.Kontakti= data;
    });


    // this.route.paramMap.subscribe(params => {
    //   if (params.get('id') != null) {
    //     const id = +params.get('id');
    //     this.id = id;

    //     const telefon = this.ApiService.getTelefon(id);

    // }
  }

  // get ime(): string {
  //   return this.Kontakt.get('ime');
  // }

  // get prezime(): string {
  //   return this.Kontakt.get('prezime');
  // }

  // get telefonskiBroj(): string {
  //   return this.Kontakt.get('telefonskiBroj');
  // }

  // get opis(): string {
  //   return this.Kontakt.get('opis');
  // }

  // get email(): string {
  //   return this.Kontakt.get('email');
  // }


  // // applyFilter(event: Event): void {
  // //   const filterValue = (event.target as HTMLInputElement).value;
  // //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }

  // }

  // btnClick(): void {
  //   this.router.navigate(['/dodaj']);
  // }

  // btnDetalji(idKontakta: number): void {
  //   this.router.navigate(['/detalji/' + idKontakta]);
  // }

  // btnUredi(idKontakta: number): void {
  //   this.router.navigate(['/uredi/' + idKontakta]);
  // }

  // btnBrisanje(idKontakta: number, ime: string, prezime: string): void {
  //   const dialogRef = this.dialog.open(DialogBrisanjeComponent, {
  //     data: { title: 'Jeste li sigurni da želite obrisati ovaj kontakt?', imePrezime: ime + ' ' + prezime }
  //   });

  //   // tslint:disable-next-line: deprecation
  //   dialogRef.afterClosed().subscribe(data => {
  //     if (data) {
  //       this.api.deleteKontakt(idKontakta);
  //       this.dataSource = new MatTableDataSource(this.api.getKontakti());
  //     }
  //   });
  
}