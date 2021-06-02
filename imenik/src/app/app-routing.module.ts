import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormaTestComponent } from './components/forma-test/forma-test.component';
import { DetaljiKontaktaComponent } from './components/imenik/detalji-kontakta/detalji-kontakta.component';
import { DodajKontaktComponent } from './components/imenik/dodaj-kontakt/dodaj-kontakt.component';
import { PopisKontaktaComponent } from './components/imenik/popis-kontakta/popis-kontakta.component';
import { UrediKontaktComponent } from './components/imenik/uredi-kontakt/uredi-kontakt.component';

const routes: Routes = [
  { path: '', component: PopisKontaktaComponent },
  { path: 'test', component: FormaTestComponent },
  { path: 'dodaj', component: DodajKontaktComponent },
  { path: 'uredi/:id', component: UrediKontaktComponent },
  { path: 'detalji/:id', component: DetaljiKontaktaComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
