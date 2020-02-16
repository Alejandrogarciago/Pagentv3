import { Component, OnInit } from '@angular/core';
import { Communication } from '../communication.model';
import { Promotion } from '../promotion.model';
import { CommunicationService } from '../communication.service';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-communication-list',
  templateUrl: './communication-list.component.html',
  styleUrls: ['./communication-list.component.css']
})
export class CommunicationListComponent implements OnInit {
  private itemDoc: AngularFirestoreCollection<Communication>;
  communication: Observable<any>;
  private promotionDoc: AngularFirestoreCollection<Promotion>;
  promotion: Observable<any>;

  constructor( private afs: AngularFirestore) {
    this.itemDoc = this.afs.collection<Communication>('communications');
    this.communication = this.itemDoc.valueChanges();
    this.promotionDoc = this.afs.collection<Promotion>('promotions');
    this.promotion = this.promotionDoc.valueChanges();
   }

  ngOnInit() {}
}
