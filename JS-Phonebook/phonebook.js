var phonebook = [];

function getPhonebook() {
  phonebook.push(contact);
}

function addContact(contact) {
  phonebook.push(contact);
}

module.exports = {
  getPhonebook,
  addContact,
};
