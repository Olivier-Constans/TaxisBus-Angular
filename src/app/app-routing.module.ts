import { NgModule } from '@angular/core';
import { RouterModule, Routes  } from '@angular/router';
import { AccueilComponent } from './component/accueil/accueil.component';
import { UserListComponent } from './component/admin/user/user-list/user-list.component';

const routes: Routes = [
 
  { path: 'accueil', component: AccueilComponent },
  { path: 'admin/user', component: UserListComponent },
  { path: '', redirectTo: '/accueil', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
