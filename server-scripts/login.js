// JSON Login Data
const fs = require('fs');
const account_file = 'private/accounts.json';
// Read existing user accounts from the file
const accounts = fs.readFileSync(account_file, 'utf-8');
const existing_accounts = JSON.parse(accounts)


function check(username, password) {
    // Find the user by username
    const user = existing_accounts.users.find(user => user.username === username);

    // Check if the user exists
    if (!user) {
      console.log('User not found.');
      return;
    } else {
      // Check if the password is correct using bcrypt
      if (user.password === password) {
        return true;
      } else {
        console.log("Wrong user password!")
      }
    }
}


module.exports = {
    check,
}