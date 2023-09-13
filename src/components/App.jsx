import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import PhonebookForm from './PhonebookForm/PhonebookForm';
import { ContactsList } from './ContactsList/ContactsList';
import { ContactsFilter } from '../components/ContactsFilter/ContactsFilter';
import {
  PhonebookTitle,
  PhonebookContainer,
  ContactsContainer,
  ContactsTitle,
} from './App.styled';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  onSubmit = contact => {
    const duplicate = this.state.contacts.find(
      item => item.name.toLowerCase() === contact.name.toLowerCase()
    );
    if (duplicate) {
      alert(`${contact.name} is already in contacts`);
      return;
    }

    const newContact = {
      ...contact,
      id: nanoid(),
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  handleChange = value => {
    this.setState({
      filter: value,
    });
  };

  getFilteredContacts = () => {
    return this.state.contacts.filter(({ name }) =>
      name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };

  handleDeleteClick = deletedId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(({ id }) => id !== deletedId),
    }));
  };

  render() {
    const { onSubmit, getFilteredContacts, handleDeleteClick, handleChange } =
      this;
    const { filter } = this.state;
    return (
      <div
        style={{
          // height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          marginLeft: 20,
          // alignItems: 'center',
          fontSize: 30,
          color: '#010101',
        }}
      >
        <PhonebookContainer>
          <PhonebookTitle>Phonebook</PhonebookTitle>
          <PhonebookForm onSubmit={onSubmit} />
        </PhonebookContainer>
        <ContactsContainer>
          <ContactsTitle>Contacts</ContactsTitle>
          <ContactsFilter value={filter} handleChange={handleChange} />
          <ContactsList
            contacts={getFilteredContacts()}
            handleDeleteClick={handleDeleteClick}
          />
        </ContactsContainer>
      </div>
    );
  }
}

export default App;
