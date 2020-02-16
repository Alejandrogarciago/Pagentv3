import { Component, OnInit } from '@angular/core';
import { Communication } from '../communication.model';
import { Promotion } from '../promotion.model';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-communication',
  templateUrl: './create-communication.component.html',
  styleUrls: ['./create-communication.component.css']
})
export class CreateCommunicationComponent implements OnInit {
  result: string;
  error: string;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  communication: Communication = new Communication();
  loading = false;
  id = this.afs.createId();
  accounts = ['Todas','100406-Abbott Diabetes Care', '100412-Abbott Cgm', '100701-Ace Banamex-Chubb', '100704-Ace Ib Customer- Chubb (Banregio, Liverpool, Falabella, Bradescard)', '101402-Ally Semperian', '101403-Ally Auto Collections', '104101-Cardif-Aniversario Liverpool', '106502-Banamex Pia 2', '106503-Afore Banamex', '115120-Lifescan Diabetes Care Latam', '118502-Mitchell Mexico', '123701-Remark Banorte', '123702-Remark Davivienda', '123707-Remark Seguros Colmena', '123708-Remark Sura', '129004-Tupperware Customer Service', '129711-Verizon Globalink Pricing', '129719-Verizon Wireles', '139201-Imass-Sorteo Si Vale', '139202-Imass-Replastificacion', '152801-Dolex-Customer Service', '159501-Renovate America', '126402-Square Trade', '169901-Allstate Insurance', '129702-Verizon Mci Mexico', '145801-Lendify Financial (Insikt)', 'Sales', 'Rh', 'It', 'Finance', 'Administracion']

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private afStorage: AngularFireStorage, ) { }
  ngOnInit() {
  }

  async fileChange(event) {
    this.downloadURL = null;
    this.error = null;

    // get the file
    const file = event.target.files[0];

    // ccreate the file reference
    const filepath = `communication/${new Date().getTime()}_${file.name}`;
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
  }

  async onSubmit(ngForm: NgForm) {
    this.loading = true;
    const {
      title,
      description,
      imagePath
    } = ngForm.form.getRawValue();
    // get the current user
    const user = this.afAuth.auth.currentUser;
    // create the object with new data
    const communication: Communication = {
      title,
      description,
      imagePath,
      active: true,
      user: user.displayName,
      userPhotoURL: user.photoURL
    };
    return this.afs.doc(`communications/${new Date().getTime()}_${communication.title}`).set(communication);
  }

  async newInternalPromotion(ngForm: NgForm) {
    this.loading = true;
    const {
      title,
      subTitle,
      description,
    } = ngForm.form.getRawValue();
    // get the current user
    const user = this.afAuth.auth.currentUser;
    // create the object with new data
    const communication: Promotion = {
      title,
      subTitle,
      description,
      active: true,
      user: user.displayName,
      userPhotoURL: user.photoURL
    };
    return this.afs.doc(`promotions/${new Date().getTime()}_${communication.title}`).set(communication);
  }

}
