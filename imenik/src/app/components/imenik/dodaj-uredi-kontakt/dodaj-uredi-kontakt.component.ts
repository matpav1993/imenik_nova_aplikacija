import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dodaj-uredi-kontakt',
  templateUrl: './dodaj-uredi-kontakt.component.html',
  styleUrls: ['./dodaj-uredi-kontakt.component.scss']
})
export class DodajUrediKontaktComponent implements OnInit {

  kontaktID;
  api: ApiService;
  dataSource: MatTableDataSource<any>;
  SviKontakti: any;
  Kontakti: any;
  Telefon: any;

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

  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.get('id') != null) {
        this.kontaktID = +params.get('id');
        this.getContactsWithPhonesAndEmail(this.kontaktID);
      }
      else {
        const fid = Date.now();
        this.contactForm.email.push({ fid: fid + '-' + 0, value: '' });
        this.contactForm.telefonskiBroj.push({ fid: fid + '-' + 0, value: '' });
      }
    })
  }

  private getContactsWithPhonesAndEmail(id: any): void {
    this.apiService.getKontakt(id).subscribe(res => {
      if (res && res.length > 0) {
        this.contactForm.ime = res[0].ime;
        this.contactForm.prezime = res[0].prezime;
        this.contactForm.punoIme = res[0].ime + '' + res[0].prezime;
        this.contactForm.opis = res[0].opis;
      }
    });
    this.apiService.getEmail(id).subscribe(res => {
      const fid = Date.now();
      if (res) {
        res.forEach((element, idx) => {
          this.contactForm.email.push({ fid: fid + '-' + idx, value: element.email });
        });
        if (res.length < 1) {
          this.contactForm.email.push({ fid: fid + '-' + 0, value: '' });
        }
      }
    });
    this.apiService.getTelefon(id).subscribe(res => {
      const fid = Date.now();
      if (res) {
        res.forEach((element, idx) => {
          this.contactForm.telefonskiBroj.push({ fid: fid + '-' + idx, value: element.telefon });
        });
        if (res.length < 1) {
          this.contactForm.telefonskiBroj.push({ fid: fid + '-' + 0, value: '' });
        }
      }
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

  async asyncSaveContact(value): Promise<void> {

    if (this.kontaktID != null) {
      const punoIme = this.contactForm.punoIme.split(' ');
      this.contactForm.ime = punoIme.shift();
      this.contactForm.prezime = this.contactForm.punoIme.replace(this.contactForm.ime, '');

      const data = {
        id: this.kontaktID,
        ime: this.contactForm.ime,
        prezime: this.contactForm.prezime,
        opis: this.contactForm.opis
      };

      const objKeys = Object.keys(value);

      await this.apiService.deleteTelefon(this.kontaktID).toPromise();
      await this.apiService.deleteEmail(this.kontaktID).toPromise();

      await this.apiService.patchKontakt(this.kontaktID, data).toPromise();

      for (const key of objKeys) {
        if (key.startsWith('telefonskiBroj-')) {
          await this.apiService.postTelefon(this.kontaktID, value[key]).toPromise();
        }
        if (key.startsWith('email-')) {
          await this.apiService.postEmail(this.kontaktID, value[key]).toPromise();
        }
        this.router.navigate(['/popis']);
      }
    }
    else {

      const punoIme = this.contactForm.punoIme.split(' ');
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
        // tslint:disable-next-line: deprecation
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

              console.warn('prvo digni loader i kada se odradi spremanje kontakta, tek onda navigiramo na popis');
              this.router.navigate(['/popis']);
            });
          }
        });
    }
  }
}
