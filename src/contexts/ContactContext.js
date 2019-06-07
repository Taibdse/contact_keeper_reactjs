import React, { useState, useEffect } from 'react';
import ContactService from '../services/contact.service';
import { isEmpty } from '../utils/validiation';

export const ContactContext = React.createContext();

export const ContactProvider = (props) => {
    const defaultContact = { id: null, name: '', email: '', phone: '', address: '' };

    const [contact, setContact] = useState(defaultContact);
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        getContacts();
    }, []);

    const getContacts = async () => {
        const contacts = await ContactService.getContacts();
        setContacts(contacts);
        // console.log(contacts);
    }   

    const changeContact = (contact) => {
        if(isEmpty(contact)) setContact(defaultContact);
        else setContact(contact);
    }

    const addContact = (contact) => {
        delete contact.id;
        try {
            const res = ContactService.addContact(contact)
            console.log(res);
            changeContact(null);
            getContacts();
            return true
        } catch (error) {
            console.log(error);
            return false;
        }
        
    }

    const removeContact = async (id) => {
        try {
            const res = await ContactService.removeContact(id);
            console.log(res);
            changeContact(null);
            getContacts();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    const updateContact = async (contact) => {
        try {
            const res = await ContactService.updateContact(contact)
            console.log(res);
            changeContact(null);
            getContacts();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    const state = { contact, contacts};
    const methods = { changeContact, getContacts, addContact, removeContact, updateContact };

    return (
        <ContactContext.Provider value={{
            ...state,
            ...methods
        }}>
            { props.children }
        </ContactContext.Provider>
    )
}