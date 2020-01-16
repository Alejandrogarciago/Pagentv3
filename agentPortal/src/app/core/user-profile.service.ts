import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserProfile } from '../profile/user-profile.model';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private itemDoc: AngularFirestoreDocument<UserProfile>;
  profile: Observable<UserProfile>;
  uid: string;
  constructor( public afs: AngularFirestore, private afStorage: AngularFireStorage, private afAuth: AngularFireAuth) {
   const uid = this.afAuth.auth.currentUser.uid;
    this.itemDoc = this.afs.doc<any>(`users/${this.uid}`);
    this.profile = this.itemDoc.valueChanges();
   }
}
