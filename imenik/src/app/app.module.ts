import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { DodajKontaktComponent } from './components/imenik/dodaj-kontakt/dodaj-kontakt.component';
import { PopisKontaktaComponent } from './components/imenik/popis-kontakta/popis-kontakta.component';
import { UrediKontaktComponent } from './components/imenik/uredi-kontakt/uredi-kontakt.component';
import { DetaljiKontaktaComponent } from './components/imenik/detalji-kontakta/detalji-kontakta.component';
import { NavigationComponent } from './components/shared/navigation/navigation.component';
import { BackButtonComponent } from './components/back-button/back-button.component';
import { FormsModule } from '@angular/forms';
import { DodajUrediKontaktComponent } from './ui/dodaj-uredi-kontakt/dodaj-uredi-kontakt.component';

@NgModule({
  declarations: [
    AppComponent,
    DodajKontaktComponent,
    PopisKontaktaComponent,
    UrediKontaktComponent,
    DetaljiKontaktaComponent,
    NavigationComponent,
    BackButtonComponent,
    DodajUrediKontaktComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
