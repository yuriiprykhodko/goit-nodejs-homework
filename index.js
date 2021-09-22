const contactsOperations = require("./db");

const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

(async () => {
  const { action, id, name, email, phone } = argv;
  switch (action) {
    case 'list':
      const contacts = await contactsOperations.listContacts();
    console.log(contacts);
      break;

    case 'get':
      const oneContact = await contactsOperations.getContactById(id);
    console.log(oneContact);
    if (!oneContact) {
      throw new Error (`Контакт с id=${id} не найден`)
    }
      break;

    case 'add':
      if(!name || !email || !phone){
                console.log("Для товара нужно указать name, price и location");
                break;
            }
      const newContact = await contactsOperations.addContact({name, email, phone})
    console.log(newContact);
      break;

    case 'remove':
      const result = await contactsOperations.removeContact(id)
    if (!result) {
      throw new Error (`Контакт с id=${id} не найден`)
    }
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
})();



