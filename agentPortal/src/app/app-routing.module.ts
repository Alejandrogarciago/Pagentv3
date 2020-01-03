import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { TicketsComponent } from './tickets/tickets.component';
import { TicketDetailsComponent } from './tickets/ticket-details/ticket-details.component';
import { TicketListComponent } from './tickets/ticket-list/ticket-list.component';


import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { map } from 'rxjs/operators';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToProfile = () =>
  map(user => user ? ['profile', (user as any).uid] : true);
const onlyAllowSelf = next =>
map(
  user => (!!user && next.params.id === (user as any).uid) || ['']
);
const routes: Routes = [


  { path: '',component: LoginComponent, canActivate: [AngularFireAuthGuard],
  data: { authGuardPipe: redirectLoggedInToProfile }},

  {
    path: 'tickets', component: TicketsComponent, children: [
      { path: 'details', component: TicketDetailsComponent },
      { path: 'list', component: TicketListComponent },     ]
  },


  {
    path: 'profile/:id', component: ProfileComponent, canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: onlyAllowSelf }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
