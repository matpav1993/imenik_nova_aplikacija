import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forma-test',
  templateUrl: './forma-test.component.html',
  styleUrls: ['./forma-test.component.scss']
})
export class FormaTestComponent implements OnInit {

  data: {
    ime: string;
    prezime: string;
    opis: string;
    telefon: string[];
    email: string[]
  } = {
    ime: 'marko',
    prezime: 'skender',
    opis: 'imenik app kontakt',
    telefon: ['123123', 'dfsdfsdfd'],
    email: ['mojEmail@gmail.com']
  } as any;

  constructor() { }

  ngOnInit(): void {
  }

  formSubmit(value): void {
    console.log(JSON.parse(JSON.stringify(value))); // izvorni oblik forme
    value.telefon = [];
    value.email = [];
    const telKeys = Object.keys(value);
    telKeys.forEach(key => {
      if (key.startsWith('telefon-')) {
        value.telefon.push(value[key]);
        delete value[key];
      }
    });
    const emailKeys = Object.keys(value);
    emailKeys.forEach(key => {
      if (key.startsWith('email-')) {
        value.email.push(value[key]);
        delete value[key];
      }
    });
    console.log(value); // sredjena forma
  }

  dodajNoviTel(): void {
    this.data.telefon.push('');
  }
  dodajNoviEmail(): void {
    this.data.email.push('');
  }
  ukloniEmail(i): void {
    this.data.email.splice(i, 1);
  }
  ukloniTelefon(i): void {
    this.data.telefon.splice(i, 1);
  }

}
