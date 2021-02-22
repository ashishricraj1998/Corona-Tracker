import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { CountriesComponent } from './component/countries/countries.component';
import { PagenotfoundComponent } from './component/pagenotfound/pagenotfound.component';


const routes: Routes = [

  {path:'', redirectTo: '',pathMatch: 'full'},
  {path:'home',component:HomeComponent},
  {path:'countries',component:CountriesComponent},



  {path:'**', component: PagenotfoundComponent}



  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
