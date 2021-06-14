import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { DialogBrisanjeComponent } from 'src/app/ui/dialog-brisanje/dialog-brisanje.component';

@Component({
  selector: 'app-detalji-kontakta',
  templateUrl: './detalji-kontakta.component.html',
  styleUrls: ['./detalji-kontakta.component.scss']
})
export class DetaljiKontaktaComponent implements OnInit {

  kontaktID: number;
  kontakt: any;
  dataSource: MatTableDataSource<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.get('id') != null) {
        this.kontaktID = +params.get('id');
        this.getContactsWithPhonesandEmail(this.kontaktID);
      }
    });
  }

  private getContactsWithPhonesandEmail(kontaktID): void {
    forkJoin({
      contact: this.apiService.getKontakt(this.kontaktID),
      phone: this.apiService.getTelefon(this.kontaktID),
      email: this.apiService.getEmail(this.kontaktID)
    }).subscribe(x => {
      this.kontakt = x.contact[0];
      this.kontakt.telefon = x.phone;
      this.kontakt.email = x.email;

      console.log(this.kontakt);
    });
  }
  editContact(): void {
    this.router.navigate(['/uredi/', this.kontaktID]);
  }

  btnBrisanje(id2: number): void {
    const dialogRef = this.dialog.open(DialogBrisanjeComponent, {
      data: { id: id2, title: 'Jeste li sigurni da želite obrisati ovaj kontakt?' }
    });

    dialogRef.afterClosed().subscribe(data => {
      this.router.navigate(['/']);
    });
  }
}
