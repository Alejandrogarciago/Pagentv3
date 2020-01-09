import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  private itemDoc: AngularFirestoreCollection<any>;
  users: Observable<any>; 

  constructor( private afs: AngularFirestore) {
    this.itemDoc = this.afs.collection<any>('users');
    this.users = this.itemDoc.valueChanges();
   }

  ngOnInit() {}

}
