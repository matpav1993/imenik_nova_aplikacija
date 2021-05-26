import { Injectable } from '@angular/core';
import { Kontakt } from '../models/kontakt.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = 'https://mrvmlytcfybswfzdapuy.supabase.co/rest/v1/';
  private apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMDA0MTg2NSwiZXhwIjoxOTM1NjE3ODY1fQ.9OQTPT_4UVPK-GKGX8cos2slLOkTvOjOAjSDO--ie5g';

  constructor(private http: HttpClient) { }

  getKontakti(): Observable<any> {
    return this.http.get<any>(this.url + 'kontakti', {
      headers: new HttpHeaders({
        apikey: this.apiKey,
      })
    });
  }

  getKontakt(id: number): Observable<any> {
    return this.http.get<any>(this.url + 'kontakti?id=eq.' + id, {
      headers: new HttpHeaders({
        apikey: this.apiKey,
      })
    });
  }

  deleteKontakt(id: number): Observable<void> {
    return this.http.delete<any>(this.url + 'kontakti?id=eq.' + id, {
      headers: new HttpHeaders({
        apikey: this.apiKey,
      })
    });
  }

  postKontakt(kontakt): Observable<void> {
    let params = new HttpParams();
    params = params.append(kontakt, kontakt);

    return this.http.post<any>(this.url + 'kontakti', kontakt, {
      headers: new HttpHeaders({
        apikey: this.apiKey,
      })
    });
  }

  putKontakt(id: number, kontakt: Kontakt): Observable<void> {
    return this.http.put<any>(this.url + 'kontakti?id=eq.' + id, kontakt, {
      headers: new HttpHeaders({
        apikey: this.apiKey,
      })
    });
  }

  getTelefoni(): Observable<any> {
    return this.http.get<any>(this.url + 'telefon', {
      headers: new HttpHeaders({
        apikey: this.apiKey,
      })
    });
  }

  getTelefon(id: number): Observable<any> {
    return this.http.get<any>(this.url + 'telefon?kontakti_id=eq.' + id, {
      headers: new HttpHeaders({
        apikey: this.apiKey,
      })
    });

  }

  deleteTelefon(id: number): Observable<void> {
    return this.http.delete<any>(this.url + 'telefon?kontakti_id=eq.' + id, {
      headers: new HttpHeaders({
        apikey: this.apiKey,
      })
    });
  }

  postTelefon(telefonskiBroj: string): Observable<void> {
    return this.http.post<any>(this.url + 'telefon' + telefonskiBroj, {
      headers: new HttpHeaders({
        apikey: this.apiKey,
      })
    });
  }

  putTelefon(id: number, telefonskiBroj: string): Observable<void> {
    return this.http.put<any>(this.url + 'telefon?kontakti_id=eq.' + id, telefonskiBroj, {
      headers: new HttpHeaders({
        apikey: this.apiKey,
      })
    });
  }

  getEmail(id: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('id', 'eq.' + id);

    return this.http.get<any>(this.url + 'email', {
      params: params,
      headers: new HttpHeaders({
        apikey: this.apiKey,
      })
    });
  }

  deleteEmail(id: number): Observable<void> {
    let params = new HttpParams();
    params = params.append('id', 'eq.' + id);

    return this.http.delete<any>(this.url + 'email', {
      params: params,
      headers: new HttpHeaders({
        apikey: this.apiKey,
      })
    });
  }

  postEmail(email: string): Observable<void> {
    return this.http.post<any>(this.url + 'email' + email, {
      headers: new HttpHeaders({
        apikey: this.apiKey,
      })
    });
  }
  putEmail(id: number, email: string): Observable<void> {
    return this.http.put<any>(this.url + 'email?kontakti_id=eq.' + id, email, {
      headers: new HttpHeaders({
        apikey: this.apiKey,
      })
    });
  }
}