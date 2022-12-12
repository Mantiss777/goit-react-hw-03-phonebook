import React, { Component } from 'react';
import css from './ContactList.module.css';
import PropTypes from 'prop-types';

class ContactList extends Component {
  state = {
    filter: '',
  };

  handleInputChange = e => {
    this.setState({ filter: e.target.value });
  };

  render() {
    const { filter } = this.state;
    const { deleteContact, contacts } = this.props;
    const filteredContacts = contacts.filter(it =>
      it.name.toLowerCase().includes(filter.toLowerCase())
    );
    return (
      <section className={css.container}>
        <h2>Contacts</h2>
        <label className={css.label}>
          <p>Find contacts by name</p>
          <input
            label="Find contacts by name"
            value={filter}
            type="text"
            name="filter"
            onChange={this.handleInputChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>

        <ul>
          {filteredContacts.map(({ id, name, number }) => {
            return (
              <li key={id} className={css.li}>
                <span className={css.name}> {name}: </span>
                <span className={css.number}>{number} </span>
                <button
                  className={css.btn}
                  type="button"
                  onClick={() => {
                    deleteContact(id);
                  }}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  deleteContact: PropTypes.func.isRequired,
};

export default ContactList;
