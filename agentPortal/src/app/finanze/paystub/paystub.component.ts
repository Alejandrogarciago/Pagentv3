import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-paystub',
  templateUrl: './paystub.component.html',
  styleUrls: ['./paystub.component.css']
})
export class PaystubComponent implements OnInit {
  private itemDoc: AngularFirestoreCollection<any>;
  paystub: Observable<any>;
  constructor(private afs: AngularFirestore) { }

  ngOnInit() { 
    this.itemDoc = this.afs.collection<any>('communications');
    this.paystub = this.itemDoc.valueChanges();
  }
}
