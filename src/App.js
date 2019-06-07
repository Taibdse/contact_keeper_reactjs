import React from 'react';
import './assets/css/bootstrap.min.css';
import './App.css';

import GlobalContext from './contexts/index';

import ContactsList from './components/contacts/ContacstList';
import ContactForm from './components/contacts/ContactForm';
import Header from './components/contacts/Header';

function App() {
  return (
    <GlobalContext>
      <Header/>
       <div className="container">
        <div className="row">
          <div className="col-sm-7">
            <ContactForm/>
          </div>
          <div className="col-sm-5">
            <ContactsList/>
          </div>
        </div>
      </div>
    </GlobalContext>
  );
}

export default App;
