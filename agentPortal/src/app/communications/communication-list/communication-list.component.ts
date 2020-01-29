import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { firestore } from 'firebase/app';

@Component({
  selector: 'app-communication-list',
  templateUrl: './communication-list.component.html',
  styleUrls: ['./communication-list.component.css']
})
export class CommunicationListComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  private communicationDoc: AngularFirestoreCollection<any>;
  communication: Observable<any>;
  key: string;
  user: any;
  viewsCount: number;

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {
    this.user = afAuth.auth.currentUser;
    this.communicationDoc = this.afs.collection<any>('communications');
    this.communication = this.communicationDoc.valueChanges();
   }

   ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };  
  }
  selectKey($event) {
    this.key = $event.target.innerHTML;
    let viewsHTML = document.getElementById(this.key).innerHTML
    console.log(viewsHTML)
    this.viewsCount =parseInt(viewsHTML)
    this.afs.doc<any>(`communications/${this.key}`).update({
      views: firestore.FieldValue.arrayUnion(this.user.uid), viewsCount: this.viewsCount +1
    });
  }
}
