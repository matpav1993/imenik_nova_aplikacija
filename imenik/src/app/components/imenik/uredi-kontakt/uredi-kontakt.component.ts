import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Kontakt } from 'src/app/models/kontakt.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-uredi-kontakt',
  templateUrl: './uredi-kontakt.component.html',
  styleUrls: ['./uredi-kontakt.component.scss']
})
export class UrediKontaktComponent implements OnInit {
  [x: string]: any;
  api: ApiService;
  dataSource: MatTableDataSource<any>;
  SviKontakti: any;
  Kontakti: any;
  Telefon: any;


  contactForm: Kontakt = {
    id: null,
    email: [],
    punoIme: "",
    ime: "",
    opis: "",
    prezime: "",
    telefonskiBroj: []
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {

    this.phones = [];
    this.emails = [];

    this.route.paramMap.subscribe(params => {
      if (params.get('id') != null) {
        this.kontaktID = +params.get('id');
        this.getContactsWithPhonesAndEmail(this.kontaktID);
      }
    });
  }
  getContactsWithPhonesAndEmail(id: any): void {
    this.apiService.getKontakt(id).subscribe(res => {
      if (res && res.length > 0) {
        this.contactForm.ime = res[0].ime;
        this.contactForm.prezime = res[0].prezime;
        this.contactForm.punoIme = res[0].ime + " " + res[0].prezime;
        this.contactForm.opis = res[0].opis;
      }
    });

    this.apiService.getEmail(id).subscribe(res => {
      if (res) {
        res.forEach(element => {
          this.emails.push(element.id)
          this.contactForm.email.push(element.email);
        });
        if (res.length < 1) {
          this.contactForm.email.push("");
        }
      }
    });

    this.apiService.getTelefon(id).subscribe(res => {
      if (res) {
        res.forEach(element => {
          this.phones.push(element.id)
          this.contactForm.telefonskiBroj.push(element.telefon);
        });
        if (res.length < 1) {
          this.contactForm.telefonskiBroj.push("");
        }
      }
    });
  }



  saveContact(value): any {


    let punoIme = this.contactForm.punoIme.split(' ');
    this.contactForm.ime = punoIme.shift();
    this.contactForm.prezime = this.contactForm.punoIme.replace(this.contactForm.ime, "");

    const data = {
      id: this.kontaktID,
      ime: this.contactForm.ime,
      prezime: this.contactForm.prezime,
      opis: this.contactForm.opis
    }

    const objKeys = Object.keys(value);

    this.apiService.patchKontakt(this.kontaktID, data)
      .subscribe(data => {
        if (data) {
          data.forEach(element => {
            let contact_id = element.id;
            objKeys.forEach(key => {
              if (key.startsWith('telefonskiBroj-')) {
                this.apiService.patchTelefon(contact_id, value[key]).subscribe();
              }
              if (key.startsWith('email-')) {
                this.apiService.patchEmail(contact_id, value[key]).subscribe();
              }
            });
          });
        }
      });


    this.router.navigate(['/popis']);
  }


  addMorePhones(event) {
    event.stopPropagation();
    this.contactForm.telefonskiBroj.push("");
    return false;
  }
  clicked(event) {
    event.stopPropagation();
    this.contactForm.email.push("");
    return false;
  }
}



