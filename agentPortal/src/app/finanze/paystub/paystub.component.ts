import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-paystub',
  templateUrl: './paystub.component.html',
  styleUrls: ['./paystub.component.css']
})
export class PaystubComponent implements OnInit {
  private itemDoc: AngularFirestoreCollection<any>;
  paystub: Observable<any>;
  paystubPdf: Observable<string>;
  constructor(private afs: AngularFirestore, private afStorage: AngularFireStorage, private router: Router) { }

  ngOnInit() { 
    this.itemDoc = this.afs.collection<any>('payroll' , ref => ref.where('Rfc', '==', 'ROUG930326C22'));
    this.paystub = this.itemDoc.valueChanges();
  }

  async getPdfPaystub($event) {
    let uuid = 'T' + $event.target.innerHTML+ '.pdf';
    this.paystubPdf = await this.afStorage.ref(`/Paystubs/${uuid}`).getDownloadURL()
  }
}