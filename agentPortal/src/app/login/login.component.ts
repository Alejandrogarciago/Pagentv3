import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  domain = '@sykes.com'
  loading = false;
  error: string;
  action: 'login' | 'signup' = 'login';
  constructor(private afAuth: AngularFireAuth, private router: Router, private afs: AngularFirestore) { }

  ngOnInit() {
  }

  async onSubmit(form: NgForm) {
    this.loading = true;
    this.error = null;
    const { firstName, lastName, secondName, motherLastName, email, password } = form.value;
    let resp: any;
    try {
      if (this.isSignup) {
        resp = await this.afAuth.auth.createUserWithEmailAndPassword(email + this.domain, password);
        await resp.user.updateProfile({ displayName: `${firstName } ${lastName}` });
        const uid= resp.user.uid
        let userProfile: any = {
          firstName, lastName, secondName, motherLastName, email, password, uid
        }
        this.afs.doc(`users/${uid}`).set(userProfile);
        form.reset();
      } else {
        resp = await this.afAuth.auth.signInWithEmailAndPassword(email + this.domain, password);
      }
      const uid = resp.user.uid;
      this.router.navigate([`/profile/${uid}`]);
    }
    catch (error) {
      console.log(error.message);
      this.error = error.message;
    };
  };

  get isLogin() {
    return this.action === 'login'
  }

  get isSignup() {
    return this.action === 'signup'
  }
};
