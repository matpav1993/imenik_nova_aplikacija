import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Kontakt } from 'src/app/models/kontakt.model';

@Component({
  selector: 'app-dodaj-kontakt',
  templateUrl: './dodaj-kontakt.component.html',
  styleUrls: ['./dodaj-kontakt.component.scss']
})
export class DodajKontaktComponent implements OnInit {

  contactForm: Kontakt = {
    id: null,
    email: [""],
    punoIme: "",
    ime: "",
    opis: "",
    prezime: "",
    telefonskiBroj: [""]
  };



  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {

  }

  saveContact(value): any {
    let punoIme = this.contactForm.punoIme.split(' ');
    this.contactForm.ime = punoIme.shift();
    this.contactForm.prezime = this.contactForm.punoIme.replace(this.contactForm.ime, "");
    const data = {
      ime: this.contactForm.ime,
      prezime: this.contactForm.prezime,
      opis: this.contactForm.opis
    }

    const objKeys = Object.keys(value);

    this.apiService.postKontakt(data)
      .subscribe(data => {
        if (data) {
          data.forEach(element => {
            let contact_id = element.id;
            objKeys.forEach(key => {
              if (key.startsWith('telefonskiBroj-')) {
                this.apiService.postTelefon(contact_id, value[key]).subscribe();
              }
              if (key.startsWith('email-')) {
                this.apiService.postEmail(contact_id, value[key]).subscribe();
              }
            });
          });
        }
        this.router.navigate(['/popis']);
      });
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

