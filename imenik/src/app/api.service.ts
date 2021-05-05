import { Todo } from './models/todo.model';
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Kontakt } from './models/kontakt.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  supabaseUrl = "https://mrvmlytcfybswfzdapuy.supabase.co";
  supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMDA0MTg2NSwiZXhwIjoxOTM1NjE3ODY1fQ.9OQTPT_4UVPK-GKGX8cos2slLOkTvOjOAjSDO--ie5g';
  supabase: SupabaseClient;


  constructor() {
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
  }

  async getKontakti() {
    let { data: kontakti, error } = await this.supabase
      .from<Kontakt>('kontakti')
      .select('*');
    return { kontakti, error };
  }

  async addKontakt(kontakt: Kontakt) {
    const { data, error } =
      await this.supabase
        .from<Kontakt>('kontakti')
        .insert(kontakt);
    return { data, error };
  }

  // async addTodo(todo: Todo) {
  //   const { data, error } = await this.supabase
  //     .from<Todo>('todos')
  //     .insert(todo)
  //   return { data, error };
  // }
  // async getTodos() {
  //   let { data: todos, error } = await this.supabase
  //     .from<Todo>('todos')
  //     .select('*')
  //     .limit(10)
  //   return { todos, error };
  // }

  async deleteKontakt(id: number) {
    const data = await this.supabase
      .from('kontakti')
      .delete()
      .match({ id: id.toString() })
    return data;
  }

  // async deleteTodo(id: string) {
  //   const data = await this.supabase
  //     .from('todos')
  //     .delete()
  //     .match({ id: id })
  //   return data
  // }

  // async update(todo: Todo) {
  //   const { data, error } = await this.supabase
  //     .from('todos')
  //     .update(todo)
  //     .match({ id: todo.id })
  // }


  async update(kontakt: Kontakt) {
    const { data, error } = await this.supabase
      .from('kontakti')
      .update(kontakt)
      .match({ id: kontakt.id.toString() })
  }

  // async updatCheck(todo: Todo) {
  //   const { data, error } = await this.supabase
  //     .from('todos')
  //     .update({ done: todo.done })
  //     .match({ id: todo.id });
  // }

  // listenAll() {
  //   const mySubscription = this.supabase
  //     .from('kontakti')
  //     .on('*', payload => {
  //       console.log('Change received!', payload)
  //     })
  //     .subscribe();
  //   return mySubscription;
  // }

}
