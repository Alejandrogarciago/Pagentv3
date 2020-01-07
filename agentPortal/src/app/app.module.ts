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



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    TicketsComponent,
    CreateTicketComponent,
    TicketDetailsComponent,
    TicketListComponent,
    PaystubComponent
    
    
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
