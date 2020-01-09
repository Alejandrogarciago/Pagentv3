import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';


import { LoginComponent } from './login/login.component';




import {  AngularFireDatabase } from '@angular/fire/database';
import { ProfileComponent } from './profile/profile.component';
import { TicketsComponent } from './tickets/tickets.component';
import { CreateTicketComponent } from './tickets/create-ticket/create-ticket.component';
import { TicketDetailsComponent } from './tickets/ticket-details/ticket-details.component';
import { TicketListComponent } from './tickets/ticket-list/ticket-list.component';
import { PaystubComponent } from './profile/paystub/paystub.component';
import { UsersComponent } from './users/users.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    TicketsComponent,
    CreateTicketComponent,
    TicketDetailsComponent,
    TicketListComponent,
    PaystubComponent,
    UsersComponent,
    CreateUserComponent,
    UserListComponent,
    UserDetailsComponent
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    HttpClientModule
  ],
  providers: [AngularFireAuthGuard, AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
