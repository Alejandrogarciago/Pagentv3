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
import {  AngularFireDatabase } from '@angular/fire/database';

import { DataTablesModule } from 'angular-datatables';
import { ProfileComponent } from './profile/profile.component';
import { TicketsComponent } from './tickets/tickets.component';
import { CreateTicketComponent } from './tickets/create-ticket/create-ticket.component';
import { TicketDetailsComponent } from './tickets/ticket-details/ticket-details.component';
import { TicketListComponent } from './tickets/ticket-list/ticket-list.component';
import { PaystubComponent } from './finanze/paystub/paystub.component';
import { UsersComponent } from './users/users.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { FinanzeComponent } from './finanze/finanze.component';
import { LoginComponent } from './login/login.component';
import { CommunicationsComponent } from './communications/communications.component';
import { CreateCommunicationComponent } from './communications/create-communication/create-communication.component';
import { CommunicationDetailComponent } from './communications/communication-detail/communication-detail.component';
import { CommunicationListComponent } from './communications/communication-list/communication-list.component';




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
    UserDetailsComponent,
    FinanzeComponent,
    CommunicationsComponent,
    CreateCommunicationComponent,
    CommunicationDetailComponent,
    CommunicationListComponent
    
    
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
    HttpClientModule,
    DataTablesModule

  ],
  providers: [AngularFireAuthGuard, AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
