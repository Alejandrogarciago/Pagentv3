import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Ticket } from '../ticket.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit {
  @Input() key: string;
  private ticketDoc: AngularFirestoreDocument<Ticket>;
  ticket: Observable<any>;

  constructor( public afs: AngularFirestore) { }

  ngOnInit() {
  }

  keyChange(){
    this.ticketDoc = this.afs.doc<Ticket>(`tickets/${this.key}`);
    this.ticket = this.ticketDoc.valueChanges();
  }

}
