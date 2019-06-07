import firebaseDB from '../config/db';

export default class ContactService{

    static ContactCollection = firebaseDB.collection('contacts');

    static async getContacts(){
        const querySnapshot = await ContactService.ContactCollection.get();
        const contacts = [];
        querySnapshot.forEach(doc => contacts.push({ id: doc.id, ...doc.data() }));
        return contacts;
    }

    static async addContact(contact){
        return ContactService.ContactCollection.add(contact);
    }

    static updateContact(contact){
        const doc = ContactService.ContactCollection.doc(`/${contact.id}`);
        return doc.update(contact);
    }

    static removeContact(id){
        return ContactService.ContactCollection.doc(`/${id}`).delete();
    }
}