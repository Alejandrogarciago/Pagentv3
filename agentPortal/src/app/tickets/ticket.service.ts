import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Ticket } from '../tickets/ticket.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private router: Router, private afAuth: AngularFireAuth, private afs: AngularFirestore, private ticket: TicketService ) { }

  createTicketDocument(ticket: Ticket) {
    // write to cloud firestore
    return this.afs.collection("tickets").add(ticket);
  }

  // use map to find the ticket id and update
  updateUserDocument(ticket: Ticket) {
    return this.afs.doc(`tickets/`).update(ticket);
  }
}
