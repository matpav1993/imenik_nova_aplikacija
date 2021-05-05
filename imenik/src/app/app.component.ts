import { Todo } from './models/todo.model';
import { ApiService } from './api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title: 'imenik';
  todos: Todo[];
  todo: Todo;
  actionLabel: string;

  constructor(private api: ApiService) {}

  async ngOnInit(): Promise<void> {
    let listen = this.api.listenAll();


    // Getting todos
    this.api.getTodos().then((data) => {
      this.todos = data.todos;
      console.log(this.todos);
    });

    // Getting contacts
    this.api.getContacts().then((data) => {
      this.kontakti = data.kontakti;
      console.log(this.kontakti);
    });


    this.clear();
  }

  addTodo() {
    if (this.todo.id) {
      //Update if exists ID{
      this.update();
      return;
    }
    this.api
      .addTodo(this.todo)
      .then((payload) => {
        this.todos.push(payload.data[0]);
      })
      .catch((erro) => console.log(`Error in add TODO ${erro}`));
    this.clear();
  }

  seleciona(todo: Todo) {
    this.todo = todo;
    this.actionLabel = 'UPDATE';
  }

  update() {
    this.api.update(this.todo).then(() => {
      let foundIndex = this.todos.findIndex((t) => t.id == this.todo.id);
      this.todos[foundIndex] = this.todo;
      this.clear();
    });
  }

  check(todoCheck: Todo) {
    this.todo = todoCheck;
    this.todo.done = !todoCheck.done;
    this.update();
  }

  delete(todo: Todo) {
    this.api
      .deleteTodo(todo.id)
      .then((dados) => (this.todos = this.arrayRemove(this.todos, todo.id)));
  }

  arrayRemove(arr: Todo[], id: string) {
    return arr.filter((ele) => ele.id != id);
  }

  clear() {
    this.todo = new Todo();
    this.actionLabel = 'ADD';
  }
}
