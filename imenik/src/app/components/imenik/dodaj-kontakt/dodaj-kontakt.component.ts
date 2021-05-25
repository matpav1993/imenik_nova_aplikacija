import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Kontakt } from 'src/app/models/kontakt.model';

@Component({
  selector: 'app-dodaj-kontakt',
  templateUrl: './dodaj-kontakt.component.html',
  styleUrls: ['./dodaj-kontakt.component.scss']
})
export class DodajKontaktComponent implements OnInit {


  contactForm: Kontakt = {
    id: null,
    email: "",
    ime: "",
    opis: "",
    prezime: "",
    telefonskiBroj: ""
  };
  router: any;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {

    // this.firstFormGroup = this.formBuilder.group({

    //   ime: new FormControl('', [Validators.required]),
    //   prezime: new FormControl('', [Validators.required]),
    //   telefonskiBroj: new FormControl('', [Validators.required]),
    //   email: new FormControl('', [Validators.required]),
    //   opis: new FormControl('', []),
    // });

  }

  saveContact() {
const data = {
  ime: this.contactForm.ime,
  prezime: this.contactForm.prezime,
  opis: this.contactForm.opis

}


    this.apiService.postKontakt(data)
      .subscribe(x => {
        console.log(x);

        
  this.router.navigate(['/popis']);
        // this.apiService.postEmail();
        // this.apiService.postTelefon();
      });
    ;
  }

  // btnSave(): void {

  //     putNewContact() {

  //       forkJoin({
  //         kontakti: this.ApiService.putKontakti(),
  //         telefoni: this.ApiService.putTelefoni()
  //       }).subscribe(x => {
  //         x.kontakti.forEach(kontakt => {
  //           kontakt.telefoni = x.telefoni.filter(tel => tel.kontakti_id === kontakt.id);
  //         });

  //         this.Kontakti = x.kontakti;
  //       });


  // this.ApiService.putKontakt(kontakt);

  // this.router.navigate(['/popis']);
}

