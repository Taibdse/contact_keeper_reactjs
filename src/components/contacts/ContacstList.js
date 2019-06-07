import React, { useState, useContext } from 'react';
import { showConfirmMessage, showSuccessMessage, showErrorMessage } from '../../utils/alert';
import { ContactContext } from '../../contexts/ContactContext';
import PropTypes from 'prop-types';

const ContactsList = (props) => {
    const contactContext = useContext(ContactContext);
    const { contacts } = contactContext;

    const editContact = (contact) => {
        contactContext.changeContact(contact);
    }

    const deleteContact = async (contact) => {
        const confirm = await showConfirmMessage({ title: `Are you sure to delete ${contact.name}'s contact` });
        if(confirm){
            console.log('delete');
            const res = await contactContext.removeContact(contact.id);
            if(res) showSuccessMessage({ title: 'Delete successfully' });
            else showErrorMessage({ title: 'Delete unsuccessfully' });
        }
    }

    return (
        <React.Fragment>
            {
                contacts.map(contact => (
                    <div className="card card-body mb-2" key={contact.id}>
                        <strong>{ contact.name }</strong>
                        <div>Phone: { contact.phone }</div>
                        <div>Email: { contact.email }</div>
                        <div>Address: { contact.address }</div>
                        <div>
                            <button className="btn btn-sm btn-danger float-right" onClick={() => deleteContact(contact)}>Delete</button>
                            <button className="btn btn-sm btn-warning float-right mr-1" onClick={() => editContact(contact)}>Edit</button>
                        </div>
                    </div>
                ))
            }
        </React.Fragment>
    );
}

ContactsList.propTypes = {};

export default ContactsList;
