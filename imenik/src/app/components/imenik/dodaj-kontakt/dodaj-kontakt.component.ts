import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dodaj-kontakt',
  templateUrl: './dodaj-kontakt.component.html',
  styleUrls: ['./dodaj-kontakt.component.scss']
})
export class DodajKontaktComponent implements OnInit {

  contactForm: {
    id: number,
    email: { fid: string, value: string }[],
    telefonskiBroj: { fid: string, value: string }[],
    punoIme: string,
    ime: string,
    opis: string,
    prezime: string
  } = {
      id: null,
      email: [],
      punoIme: '',
      ime: '',
      opis: '',
      prezime: '',
      telefonskiBroj: []
    };


  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    const fid = Date.now();
    this.contactForm.email.push({ fid: fid + '-' + 0, value: '' });
    this.contactForm.telefonskiBroj.push({ fid: fid + '-' + 0, value: '' });
  }

  saveContact(value): any {
    const punoIme = this.contactForm.punoIme.split('');
    this.contactForm.ime = punoIme.shift();
    this.contactForm.prezime = this.contactForm.punoIme.replace(this.contactForm.ime, '');
    const data = {
      ime: this.contactForm.ime,
      prezime: this.contactForm.prezime,
      opis: this.contactForm.opis
    };

    const objKeys = Object.keys(value);

    this.apiService.postKontakt(data)
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe(data => {
        if (data) {
          data.forEach(element => {
            // tslint:disable-next-line: variable-name
            const contact_id = element.id;
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
  trackBy(index: string, item: any): string {
    return item.fid;
  }

  delPhone(fid): void {
    const idx = this.contactForm.telefonskiBroj.findIndex(x => x.fid === fid);
    this.contactForm.telefonskiBroj.splice(idx, 1);
  }

  delEmail(fid): void {
    const idx = this.contactForm.email.findIndex(x => x.fid === fid);
    this.contactForm.email.splice(idx, 1);
  }

  addMorePhones(): void {
    const fid = Date.now();
    this.contactForm.telefonskiBroj.push({ fid: fid + '-' + 0, value: '' });
  }

  addMoreEmails(): void {
    const fid = Date.now();
    this.contactForm.email.push({ fid: fid + '-' + 0, value: '' });
  }
}

