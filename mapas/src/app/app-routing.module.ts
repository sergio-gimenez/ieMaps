import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { InitialFormComponent } from './initial-form/initial-form.component';


const routes: Routes = [
  {path: 'map', component: MainPageComponent},
  {path: '', redirectTo: '/form', pathMatch: 'full'},
  {path: 'form', component: InitialFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
