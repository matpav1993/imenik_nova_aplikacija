import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/account/login/login.component';
import { RegisterComponent } from './components/account/register/register.component';
import { DetaljiKontaktaComponent } from './components/imenik/detalji-kontakta/detalji-kontakta.component';
import { DodajKontaktComponent } from './components/imenik/dodaj-kontakt/dodaj-kontakt.component';
import { HomeComponent } from './components/imenik/home/home.component';
import { PopisKontaktaComponent } from './components/imenik/popis-kontakta/popis-kontakta.component';
import { UrediKontaktComponent } from './components/imenik/uredi-kontakt/uredi-kontakt.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dodaj', component: DodajKontaktComponent },
  { path: 'uredi', component: UrediKontaktComponent },
  { path: 'detalji', component: DetaljiKontaktaComponent },
  { path: 'popis', component: PopisKontaktaComponent },
  { path: '*', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
