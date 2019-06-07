import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { ContactContext } from '../../contexts/ContactContext';
import { isEmpty, isPhone, isEmail } from '../../utils/validiation';
import { showSuccessMessage, showErrorMessage } from '../../utils/alert';

const ContactForm  = (props) => {
    const contactContext = useContext(ContactContext);

    const submit = async (e) => {
        e.preventDefault();
        
        const { contact } = contactContext;
        const errors = validateInput(contact);
        if(isEmpty(errors)){
            if(isEmpty(contact.id)){
                const res = await contactContext.addContact(contact);
                if(res) showSuccessMessage({ title: `Added ${contact.name}'s contact successfully` });
                else showErrorMessage({ title: `Can not add ${contact.name}'s contact` });
            } else {
                const res = await contactContext.updateContact(contact);
                if(res) showSuccessMessage({ title: `Updated ${contact.name}'s contact successfully` });
                else showErrorMessage({ title: `Can not update ${contact.name}'s contact` });
            }
        } else {
            const div = window.document.createElement('div');
            div.innerHTML = Object.values(errors).join('<br>');

            showErrorMessage({ 
                title: 'Invalid input data', 
                content: div 
            });
        }
    }

    const validateInput = (contact) => {
        const { name, phone, email, address } = contact;
        const errors = {};
        if(isEmpty(name)) errors.name = 'Name is required';
        if(!isPhone(phone)) errors.phone = 'Phone must have 9 - 12 digits';
        if(!isEmail(email)) errors.email = 'Email is not valid';
        if(isEmpty(address)) errors.address = 'Address is required';
        return errors;
    }

    const onChange = (e) => {
        const contact = Object.assign({}, contactContext.contact);
        contact[e.target.name] = e.target.value;
        contactContext.changeContact(contact);
    }

    const clearForm = () => contactContext.changeContact(null);

    const { contact } = contactContext;

    return (
        <div className="card card-body">
            <form onSubmit={submit}>
                <div className="form-group">
                    <strong>Name</strong>
                    <input
                        name="name"
                        value={contact.name}
                        placeholder="Enter name..."
                        className="form-control"
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <strong>Phone</strong>
                    <input
                        name="phone"
                        value={contact.phone}
                        placeholder="Enter phone..."
                        className="form-control"
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <strong>Email</strong>
                    <input
                        name="email"
                        value={contact.email}
                        placeholder="Enter email..."
                        className="form-control"
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <strong>Address</strong>
                    <input
                        name="address"
                        value={contact.address}
                        placeholder="Enter address..."
                        className="form-control"
                        onChange={onChange}
                    />
                </div>
                <button className="btn btn-success float-right">Save</button>
                <button type="button" className="btn btn-primary float-right mr-1" onClick={clearForm}>Clear</button>
            </form>
        </div>
    );
}

ContactForm.propTypes = {};

export default ContactForm;
