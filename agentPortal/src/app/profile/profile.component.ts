import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserProfile } from '../profile/user-profile.model';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private itemDoc: AngularFirestoreDocument<UserProfile>;
  profile: Observable<UserProfile>;
  uid: string;
  loading = false;
  error: string;
  downloadURL: Observable<string>;
  uploadProgress: Observable<number>;

  constructor(
    public afs: AngularFirestore,
    private route: ActivatedRoute,
    private afStorage: AngularFireStorage,
    private afAuth: AngularFireAuth) {
    this.uid = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.itemDoc = this.afs.doc<any>(`users/${this.uid}`);
    this.profile = this.itemDoc.valueChanges();
  }

  async onSubmit(ngForm: NgForm) {
    this.loading = true;
    const {
      firstName,
      lastName,
      motherLastName,
      email,
      birthday,
      gender,
      role
    } = ngForm.form.getRawValue();

    const userProfile: UserProfile = {
      uid: this.uid,
      name,
      firstName,
      lastName,
      motherLastName,
      email,
      birthday,
      gender,
      role
    };

    try {
        return this.afs.doc(`users/${userProfile.uid}`).update(userProfile);
    } catch (error) {
      console.log(error.message);
      this.error = error.message;
    }

    this.loading = false;
  }

  async fileChange(event) {
    this.downloadURL = null;
    this.error = null;

    // get the file
    const file = event.target.files[0];

    // ccreate the file reference
    const filepath = `users/${this.uid}/profile-image`;
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
          this.updatePhotoUrl();
        })
      );
  }

  updatePhotoUrl() {
    this.downloadURL.subscribe(
      value => this.afAuth.auth.currentUser.updateProfile({ photoURL: value })
    );
  }

  
  updateUrl($event) {
  const imagePath = $event.target.innerHTML;
    this.afAuth.auth.currentUser.updateProfile({photoURL: imagePath});
    this.afs.doc(`users/${this.uid}`).update({imageUpdate: false});
  }

  incorrectImage() {
      this.afs.doc(`users/${this.uid}`).update({imageUpdate: false});
    }
}
