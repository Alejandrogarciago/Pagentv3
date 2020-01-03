import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreCollectionGroup, DocumentData } from '@angular/fire/firestore';
import { Ticket } from '../ticket.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import uniqBy from 'lodash/uniqBy';
import { Router } from '@angular/router';

class TicketOption {
    Category: string;
    Department: string;
    Description: string;
    Subcategory: string;
}



@Component({
    selector: 'app-create-ticket',
    templateUrl: './create-ticket.component.html',
    styleUrls: ['./create-ticket.component.css']
})
export class CreateTicketComponent implements OnInit {
    private itemDoc: AngularFirestoreCollection<TicketOption>;
    department$: Observable<any>;
    category$: Observable<any>;
    description$: Observable<any>;
    subcategory$: Observable<any>;
    loading = false;
    modalStatus: string;

    constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth,  private router: Router,) {
        this.itemDoc = this.afs.collection<TicketOption>('ticketOptions');
        this.department$ = this.itemDoc.valueChanges()
            .pipe(
                map(ticketOptions => uniqBy(ticketOptions, 'Department'))
            );
        this.description$ = this.itemDoc.valueChanges()
            .pipe(
                map(ticketOptions => uniqBy(ticketOptions, 'Description'))
            );
    }

    ngOnInit() {
    }

    selectDepartment($event, departmentValue) {
        this.itemDoc = this.afs.collection<TicketOption>('ticketOptions', ref => ref.where('Department', '==', departmentValue));
        this.category$ = this.itemDoc.valueChanges()
            .pipe(
                map(ticketOptions => uniqBy(ticketOptions, 'Category'))
            );
    }

    selectCategory($event, categoryValue) {
        this.itemDoc = this.afs.collection<TicketOption>('ticketOptions', ref => ref.where('Category', '==', categoryValue));
        this.subcategory$ = this.itemDoc.valueChanges()
            .pipe(
                map(ticketOptions => uniqBy(ticketOptions, 'Subcategory'))
            );
    }

    selectSubcategory($event, SubcategoryValue) {
        this.itemDoc = this.afs.collection<TicketOption>('ticketOptions', ref => ref.where('Subcategory', '==', SubcategoryValue));
        this.description$ = this.itemDoc.valueChanges()
            .pipe(
                map(ticketOptions => uniqBy(ticketOptions, 'Subcategory'))
            );
    }

    async onSubmit(ngForm: NgForm) {
        this.loading = true;
        const {
            department,
            category,
            description,
            subcategory
        } = ngForm.form.getRawValue();
        // get the current user
        const user = this.afAuth.auth.currentUser;
        const id = this.afs.createId();
        // create the object with new data
        const ticket: Ticket = {
            key: id,
            department,
            category,
            description,
            subcategory,
            user: user.displayName,
            uid: user.uid,
            userPhotoURL: user.photoURL,
            status: 'pendiente',
            answer: '',
            score: 0

        };
        ngForm.reset();
        return this.afs.doc(`tickets/${id}`).set(ticket);
        
    }
    
}
