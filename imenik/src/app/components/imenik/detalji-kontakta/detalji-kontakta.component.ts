import { Component, OnInit } from '@angular/core';
import { MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS } from '@angular/material/button-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-detalji-kontakta',
  templateUrl: './detalji-kontakta.component.html',
  styleUrls: ['./detalji-kontakta.component.scss']
})
export class DetaljiKontaktaComponent implements OnInit {

  kontaktID: number;
  kontakt: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.get('id') != null) {
        this.kontaktID = +params.get('id');
        this.getContactsWithPhonesandEmail(this.kontaktID);
      }
    });
  }

  getContactsWithPhonesandEmail(kontaktID) {
    forkJoin({
      contact: this.apiService.getKontakt(this.kontaktID),
      phone: this.apiService.getTelefon(this.kontaktID),
      email: this.apiService.getEmail(this.kontaktID)
    }).subscribe(x => {
      this.kontakt = x.contact[0];
      this.kontakt.telefon = x.phone;
      this.kontakt.email = x.email;

      console.log(this.kontakt);
      // x.kontakti.forEach(kontakt => {
      //   kontakt.telefoni = x.telefoni.filter(tel => tel.kontakti_id === kontakt.id),
      //     kontakt.email = x.email.filter(email => email.kontakti_id === kontakt.id);
      // });
      // this.kontakt = x.kontakti;
    });
  }
  editContact(){
    this.router.navigate(['/uredi/:id']);
  }
  
}
