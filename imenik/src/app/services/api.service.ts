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
        prefer: 'return=representation'
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

  postKontakt(kontakt): Observable<any> {
    return this.http.post<any>(this.url + 'kontakti', kontakt, {
      headers: new HttpHeaders({
        apikey: this.apiKey,
        prefer: 'return=representation'
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
    return this.http.get<any>(this.url + 'telefon?select=telefon,id&kontakti_id=eq.' + id, {
      headers: new HttpHeaders({
        apikey: this.apiKey
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

  postTelefon(kontakti_id, telefon): Observable<any> {
    return this.http.post<any>(this.url + 'telefon', {
      kontakti_id, telefon
    }, {
      headers: new HttpHeaders({
        apikey: this.apiKey,
        prefer: 'return=representation'
      })
    });
  }

  getEmail(id: number): Observable<any> {
    return this.http.get<any>(this.url + 'email?select=email,id&kontakti_id=eq.' + id, {
      headers: new HttpHeaders({
        apikey: this.apiKey,
        prefer: 'return=representation'
      })
    });
  }

  deleteEmail(id: number): Observable<void> {
    return this.http.delete<any>(this.url + 'email?id=eq.' + id, {
      headers: new HttpHeaders({
        apikey: this.apiKey,
      })
    });
  }

  postEmail(kontakti_id,email): Observable<any> {
    return this.http.post<any>(this.url + 'email', {
      kontakti_id, email
    }, {
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
  patchEmail(id: number, email: string): Observable<any> {
    return this.http.patch<any>(this.url + 'email?kontakti_id=eq.' + id, email, {
      headers: new HttpHeaders({
        apikey: this.apiKey,
      })
    });
  }
  patchTelefon(id: number, telefon: string): Observable<any> {
    return this.http.patch<any>(this.url + 'telefon?kontakti_id=eq.' + id, telefon, {
      headers: new HttpHeaders({
        apikey: this.apiKey,
      })
    });
  }
  patchKontakt(id: number, kontakt): Observable<any> {
    return this.http.patch<any>(this.url + 'kontakti?id=eq.' + id, kontakt, {
      headers: new HttpHeaders({
        apikey: this.apiKey,
      })
    });
  }
}
