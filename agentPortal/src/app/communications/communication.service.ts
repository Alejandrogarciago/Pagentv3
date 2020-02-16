import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Communication } from './communication.model';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  private dbPath = '/communications'

  communicationRef: AngularFireList<Communication> = null;

  constructor(private db: AngularFireDatabase) {
  this.communicationRef = db.list(this.dbPath)
  }

  createCommunication( communication : Communication): void {
    this.communicationRef.push(communication)
  }

  updateCommunication ( key: string, value: any): Promise<void> {
    return this.communicationRef.update(key, value)
  }

  deleteCommunication ( key:string): Promise<void> {
    return this.communicationRef.remove(key)
  }

  getCommunicationList(): AngularFireList<Communication> {
    return this.communicationRef;
  }

  deleteAll(): Promise<void> {
    return this.communicationRef.remove()
  }

}
