import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { CustomersComponent } from './customers/customers.component'
import { ReportsComponent } from './reports/reports.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      { path: 'profile', component: HomepageComponent },
      { path: 'customers', component: CustomersComponent },
      { path: 'reports', component: ReportsComponent },
      { path: '**', component: HomeComponent }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
