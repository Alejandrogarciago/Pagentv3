import { Component, OnInit } from '@angular/core';
import { Ticket } from '../ticket.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  private itemDoc: AngularFirestoreCollection<Ticket>;
  item: Observable<any>;
  key: string;
  user: any;

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth ) {
    this.user = afAuth.auth.currentUser;
    
   }

  ngOnInit() {
    this.itemDoc = this.afs.collection<Ticket>('tickets');
    this.item = this.itemDoc.valueChanges();
  }
  selectKey($event) {
    this.key = $event.target.innerHTML;
  }
}
