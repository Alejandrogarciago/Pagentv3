import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { firestore } from 'firebase/app';

@Component({
  selector: 'app-communication-detail',
  templateUrl: './communication-detail.component.html',
  styleUrls: ['./communication-detail.component.css']
})
export class CommunicationDetailComponent implements OnInit {
  loading = false;
  photoURL: string;
  error: string;
  @Input() key: string;
  private communicationDoc: AngularFirestoreDocument<any>;
  communication: Observable<any>;
  communicationRef: string;
  sub
  likeType: string;
  dislikeType: string;
  likesCount: number;
  dislikesCount: number;
  hideLikes= true;
  hideDislikes= true;

  constructor(public afs: AngularFirestore, public afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.communicationDoc = this.afs.doc<any>(`communications/${this.key}`);
    this.communication = this.communicationDoc.valueChanges();
    this.photoURL = this.afAuth.auth.currentUser.photoURL;
    if (this.key !== undefined) {
      this.sub = this.communicationDoc.valueChanges().subscribe(val => {
        this.communicationRef = val;
        this.likeType = val.likes.includes(this.photoURL) ? 'like' : 'like-empty';
        this.dislikeType = val.dislikes.includes(this.photoURL) ? 'dislike' : 'dislike-empty';
        this.likesCount = val.likesCount;
        this.dislikesCount = val.dislikesCount;
        console.log(this.likesCount, this.dislikesCount)
      });
    };
  }


  likeHandler() {
    if (this.likeType == 'like-empty') {
      this.communicationDoc.update({
        likes: firestore.FieldValue.arrayUnion(this.photoURL), likesCount: this.likesCount + 1
      });
      if (this.dislikeType == 'dislike') {
        this.communicationDoc.update({
          dislikes: firestore.FieldValue.arrayRemove(this.photoURL)
        });
        this.communicationDoc.update({
          dislikesCount: this.dislikesCount - 1
        });

      }
    } else {
      this.communicationDoc.update({
        likes: firestore.FieldValue.arrayRemove(this.photoURL), likesCount: this.likesCount - 1
      });
    }
  }

  dislikeHandler() {
    if (this.dislikeType == 'dislike-empty') {
      this.communicationDoc.update({
        dislikes: firestore.FieldValue.arrayUnion(this.photoURL), dislikesCount: this.dislikesCount + 1
      });
      if (this.likeType == 'like') {
      this.communicationDoc.update({
        likes: firestore.FieldValue.arrayRemove(this.photoURL)
      });
        this.communicationDoc.update({
          likesCount: this.likesCount - 1
        });
      }
    } else {
      this.communicationDoc.update({
        dislikes: firestore.FieldValue.arrayRemove(this.photoURL), dislikesCount: this.dislikesCount - 1
      });
    }
  }

  showReactions(){
    this.hideLikes = !this.hideLikes;
    this.hideDislikes = !this.hideDislikes;
  }

}
