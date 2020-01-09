import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { ViewChild, ElementRef} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  @ViewChild('closeAddExpenseModal' , {static: false}) closeCreateUserModal: ElementRef;
  modalDismiss = false;
  loading = false;
  error: string;
  result: string;
  domain= '@sykes.com'
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;

  constructor( private afAuth: AngularFireAuth,private afs: AngularFirestore, private afStorage: AngularFireStorage) { }

  ngOnInit() {
  }

  async fileChange(event) {
    this.downloadURL = null;
    this.error = null;

    // get the file
    const file = event.target.files[0];

    // ccreate the file reference
    const filepath = `usersProfileImage/${new Date().getTime()}_${file.name}`;
    const fileref = this.afStorage.ref(filepath);

    // upload and store the task
    const task = this.afStorage.upload(filepath, file);

    task.catch(error => this.error = error.message);

    // observer percentage changes
    this.uploadProgress = task.percentageChanges();

    // get notified when the download URL is avaliable
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileref.getDownloadURL();
        })
      ).subscribe();
    this.result = "Image upload complete"
  }

  async onSubmit(form: NgForm) {
    this.loading = true;
    this.error = null;
    this.result = null;
    const { name, secondName, lastName, secondLastName, user, password} = form.value;
    let resp: any;
    try {
      resp = await this.afAuth.auth.createUserWithEmailAndPassword( user + this.domain , password);
      const uid = resp.user.uid;
      this.afs.doc(`users/${uid}`).set(form.value);
      form.reset();
      this.result = 'User created sucessfully'
    }
    catch (error) {
      this.error = error.message;
    };
  };

  modalClose() {
    this.error = null;
    this.result = null;
  }

}
