import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-communication',
  templateUrl: './create-communication.component.html',
  styleUrls: ['./create-communication.component.css']
})
export class CreateCommunicationComponent implements OnInit {
  result: string;
  error: string;
  loading = false;
  downloadURL: Observable<string>;
  uploadProgress: Observable<number>;
  id = this.afs.createId();
  accounts = ['Todas','100406-Abbott Diabetes Care', '100412-Abbott Cgm', '100701-Ace Banamex-Chubb', '100704-Ace Ib Customer- Chubb (Banregio, Liverpool, Falabella, Bradescard)', '101402-Ally Semperian', '101403-Ally Auto Collections', '104101-Cardif-Aniversario Liverpool', '106502-Banamex Pia 2', '106503-Afore Banamex', '115120-Lifescan Diabetes Care Latam', '118502-Mitchell Mexico', '123701-Remark Banorte', '123702-Remark Davivienda', '123707-Remark Seguros Colmena', '123708-Remark Sura', '129004-Tupperware Customer Service', '129711-Verizon Globalink Pricing', '129719-Verizon Wireles', '139201-Imass-Sorteo Si Vale', '139202-Imass-Replastificacion', '152801-Dolex-Customer Service', '159501-Renovate America', '126402-Square Trade', '169901-Allstate Insurance', '129702-Verizon Mci Mexico', '145801-Lendify Financial (Insikt)', 'Sales', 'Rh', 'It', 'Finance', 'Administracion']

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private afStorage: AngularFireStorage) { }

  ngOnInit() {
  }

  async fileChange(event) {
    this.downloadURL = null;
    this.error = null;
    const file = event.target.files[0];
    const filepath = `communicationsImages/${this.id}`;
    const fileref = this.afStorage.ref(filepath);
    const task = this.afStorage.upload(filepath, file);
    task.catch(error => this.error = error.message);
    this.uploadProgress = task.percentageChanges();
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
    const user = this.afAuth.auth.currentUser;
    
    const { title, description, account, imagePath } = form.value;
    const communication: any = {
      key: this.id,
      title,
      description,
      account,
      imagePath,
      uploadedBy: user.displayName,
      uploadedByUid: user.uid,
      uploadedByPhotoURL: user.photoURL,
      likes:[],
      likesCount: 0,
      dislikes: [],
      dislikesCount: 0,
      views: [],
      viewsCount: 0
    };
    try {
      this.afs.doc(`communications/${this.id}`).set(communication);
      form.reset();
      this.result = 'Publicacion compartida'
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
