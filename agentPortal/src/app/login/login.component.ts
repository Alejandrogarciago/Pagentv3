import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading = false;
  error: string;
  domain = '@sykes.com'
  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
  }

  async onSubmit(form: NgForm) {
    this.loading = true;
    this.error = null;
    const { email, password} = form.value;
    let resp: any;
    try {
      resp = await this.afAuth.auth.signInWithEmailAndPassword(email + this.domain, password);
      const uid = resp.user.uid;
      this.routeLogin();
    }
    catch (error) {
      console.log(error.message);
      this.error = error.message;
    };
  };

  async routeLogin() {
    const user = this.afAuth.auth.currentUser;
    const token = user.getIdTokenResult();

    if( (await token).claims.admin) {
      this.router.navigate(['/users'])
    } else {
      this.router.navigate([`/profile/${user.uid}`]);
    }
  }
};
