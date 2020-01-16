import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore,  } from '@angular/fire/firestore';
import { Ticket } from '../ticket.model';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit {
  loading = false;
  error: string;
  @Input() key: string;
  private ticketDoc: AngularFirestoreDocument<Ticket>;
  ticket: Observable<any>;
  constructor(public afs: AngularFirestore) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ticketDoc = this.afs.doc<Ticket>(`tickets/${this.key}`);
    this.ticket = this.ticketDoc.valueChanges();
  }

  starHandler($event) {
    this.afs.doc<Ticket>(`tickets/${this.key}`).update({ score: $event.target.value, status: 'calificado' });
  }

  async onSubmit(ngForm: NgForm) {
    this.loading = true;
    const {
      answer
    } = ngForm.form.getRawValue();
    const status = 'repondido'
    const ticket: any = {
      answer,
      status
    };

    try {
      return this.afs.doc(`tickets/${this.key}`).update(ticket);
    } catch (error) {
      console.log(error.message);
      this.error = error.message;
    }
  }
}