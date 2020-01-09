import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { TicketsComponent } from './tickets/tickets.component';
import { TicketDetailsComponent } from './tickets/ticket-details/ticket-details.component';
import { TicketListComponent } from './tickets/ticket-list/ticket-list.component';


import { AngularFireAuthGuard, redirectUnauthorizedTo, customClaims } from '@angular/fire/auth-guard';
import { map } from 'rxjs/operators';
import { UsersComponent } from './users/users.component';
import { pipe } from 'rxjs';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToProfile = () =>
  map(user => user ? ['profile', (user as any).uid] : true);
const onlyAllowSelf = next =>
  map(
    user => (!!user && next.params.id === (user as any).uid) || ['']
  );

const adminOnly = () => pipe(
  customClaims,
  map(claims => claims.admin === true || [''])
);

const redirectLoggedInToProfileOrUsers = (next) =>
  pipe(
    customClaims,
    map(
      claims => {
        // if no claims, no authenticated user 
        // so allow route ['']
        if (claims.length = 0) {
          return true;
        }

        // if a user claims is set redirect t0 ['users']
        if (claims.admin) {
          return ['users']
        }

        return ['profile', claims.user.id]
      })
  );

const onlyAllowSelfOrAdmin = (next) =>
  pipe(
    customClaims,
    map(claims => {
      // if no claims, no authenticated user 
      // so allow route ['']
      if (claims.length = 0) {
        return [''];
      }
      return next.params.id === claims.user.id || claims.admin;

    })
  )
const routes: Routes = [


  {
    path: '', component: LoginComponent, canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToProfileOrUsers }
  },

  {
    path: 'tickets', component: TicketsComponent, children: [
      { path: 'details', component: TicketDetailsComponent },
      { path: 'list', component: TicketListComponent },]
  },


  {
    path: 'profile/:id', component: ProfileComponent, canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: onlyAllowSelfOrAdmin }
  },
  {
    path: 'users', component: UsersComponent, canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: adminOnly }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
