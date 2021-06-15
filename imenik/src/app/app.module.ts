import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { PopisKontaktaComponent } from './components/imenik/popis-kontakta/popis-kontakta.component';
import { DetaljiKontaktaComponent } from './components/imenik/detalji-kontakta/detalji-kontakta.component';
import { NavigationComponent } from './components/shared/navigation/navigation.component';
import { BackButtonComponent } from './components/back-button/back-button.component';
import { FormsModule } from '@angular/forms';
import { DodajUrediKontaktComponent } from './components/imenik/dodaj-uredi-kontakt/dodaj-uredi-kontakt.component';
import { DialogBrisanjeComponent } from './ui/dialog-brisanje/dialog-brisanje.component';

@NgModule({
  declarations: [
    AppComponent,
    PopisKontaktaComponent,
    DetaljiKontaktaComponent,
    NavigationComponent,
    BackButtonComponent,
    DodajUrediKontaktComponent,
    DialogBrisanjeComponent,
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
