import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetaljiKontaktaComponent } from './components/imenik/detalji-kontakta/detalji-kontakta.component';
import { PopisKontaktaComponent } from './components/imenik/popis-kontakta/popis-kontakta.component';
import { DodajUrediKontaktComponent } from './components/imenik/dodaj-uredi-kontakt/dodaj-uredi-kontakt.component';

const routes: Routes = [
  { path: '', component: PopisKontaktaComponent },
  { path: 'dodaj', component: DodajUrediKontaktComponent },
  { path: 'uredi/:id', component: DodajUrediKontaktComponent },
  { path: 'detalji/:id', component: DetaljiKontaktaComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
