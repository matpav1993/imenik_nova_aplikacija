import { Todo } from './models/todo.model';
import { ApiService } from './api.service';
import { Component, OnInit } from '@angular/core';
import { Kontakt } from './models/kontakt.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  kontakti: Kontakt[];

  title: 'imenik';
  todos: Todo[];
  todo: Todo;
  actionLabel: string;

  constructor(private api: ApiService) { }

  async ngOnInit(): Promise<void> {



    // Getting contacts
    // this.api.getKontakti().then((data) => {
    //   this.kontakti = data.kontakti;
    //   console.log(this.kontakti);
    // });

    // // Getting contacts
    // const kontakt = { "id": 1, "ime": "Ivo", "prezime": "Milić", "telefonskiBroj": "1231213", "email": "ivo.milic@gmail.com", "opis": "xxxx" };

    // this.api
    //   .addKontakt(kontakt)
    //   .then((payload) => {
    //     console.log(payload);
    //   }).catch((erro) => 
    //   console.log(`Error in add TODO ${erro}`));

    // // Updateanje kontakta
    // this.api
    //   .update(kontakt)
    //   .then((data) => {
    //     console.log(data);
    //   });

    // // Brisanje kontakta
    // let idKontakta = 1;
    // this.api
    //   .deleteKontakt(idKontakta)
    //   .then((data) => {
    //     console.log(data);
    //   });

  }

  // addTodo() {
  //   if (this.todo.id) {
  //     //Update if exists ID{
  //     this.update();
  //     return;
  //   }
  //   this.api
  //     .addTodo(this.todo)
  //     .then((payload) => {
  //       this.todos.push(payload.data[0]);
  //     })
  //     .catch((erro) => console.log(`Error in add TODO ${erro}`));
  //   this.clear();
  // }

  // seleciona(kontakt: Kontakt) {
  //   this.kontakti = this.kontakti;
  //   this.actionLabel = 'UPDATE';
  // }

  // update() {

  // }

  // check(kontaktCheck: Kontakt) {
  //   this.kontakt = kontaktCheck;
  //   this.kontakti.opis = !kontaktCheck.opis;
  //   this.update();
  // }

  // delete(kontakt: Kontakt) {
  //   this.api
  //     .deleteKontakt(this.kontakti.id)
  //     .then((dados) => (this.kontakti = this.arrayRemove(this.kontakti, kontakt.id)));
  // }

  // arrayRemove(arr: Kontakt[], id: string) {
  //   return arr.filter((kon) => kon.id != id);
  // }

  // clear() {
  //   this.kontakt = new Kontakt();
  //   this.actionLabel = 'ADD';
  // }
}
