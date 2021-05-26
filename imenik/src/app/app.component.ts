import { Todo } from './models/todo.model';
import { ApiService } from './services/api.service';
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



    
}
}