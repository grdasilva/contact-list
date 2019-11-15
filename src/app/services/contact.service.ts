import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contact } from '../constants/contact.interface';

@Injectable({
  providedIn: 'root'
})

export class ContactService {

  private contactsColection : AngularFirestoreCollection<Contact>;

  private contacts: Observable<Contact[]>;

  constructor(db: AngularFirestore) { 
    this.contactsColection = db.collection<Contact>('contacts');

    this.contacts = this.contactsColection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data};
        });
      })
    );
  }

  getContacts() {
    return this.contacts;
  }

  getContact(id) {
    return this.contactsColection.doc<Contact>(id).valueChanges();
  }

  updateContact(contact: Contact, id: string) {
    return this.contactsColection.doc(id).update(contact);
  }

  addContact(contact: Contact) {
    return this.contactsColection.add(contact);
  }

  removeContact(id) {
    return this.contactsColection.doc(id).delete();
  }
  
}