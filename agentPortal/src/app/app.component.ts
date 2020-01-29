import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FirebaseFirestore } from '@angular/fire';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserProfile } from './profile/user-profile.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  private itemDoc: AngularFirestoreDocument<UserProfile>;
  profile: Observable<UserProfile>;
  status: boolean;
  uid: string;
 

  constructor(private router: Router,  public afAuth: AngularFireAuth, private afs: AngularFirestore) {  }

  ngOnInit() {
    this.afAuth.authState.subscribe( user => {
      if (user) { this.uid = user.uid }
    });
    this.itemDoc = this.afs.doc<any>(`users/${this.uid}`);
    this.profile = this.itemDoc.valueChanges();
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['']);
  }

  sidebarToggle() {
    this.status = !this.status;
  }
}
