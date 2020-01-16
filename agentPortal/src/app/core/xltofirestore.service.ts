import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import * as _ from 'lodash';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class XltofirestoreService {

  ref = firebase.storage().ref('excel');

  constructor(private afs: AngularFirestore, private http: HttpClient) { }

  uploadFile(file) {
    return new Promise((resolve) => {


      this.ref.put(file).then(function (snapshot) {
        let downloadurl = snapshot.downloadURL;
        firebase.database().ref('excelimport').child('newexcel').set({
          thaturl: downloadurl
        }).then(() => {

          console.log('uploaded');


        })


      });
      setTimeout(() => {
        this.firestorethis().then(() => {
          resolve();
        })
      }, 60000);
    })


  }

  firestorethis() {
    return new Promise((resolve) => {
      firebase.storage().ref('jsonfile.json').getDownloadURL().then((url) => {
        this.http.get(url).pipe(
          map((res: any) => res.json().subscribe((data) => {
            let somerand = JSON.stringify(res);
            this.storethis(res).then(() => {
              resolve()
            })
          }))
        )
      })
    })
  }

  storethis(somejson) {
    return new Promise((resolve) => {


      _.map(somejson, (element, i) => {
        _.keys(element).map(elementkey => {
          this.afs.collection('mycoll').doc('document' + i).set(element);
        })
      })
      resolve();
    })


  }

}
