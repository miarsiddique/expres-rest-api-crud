const db = require('../../migration');
class User {

   constructor(data) {
      this.firstname = data.firstname;
      this.lastname = data.lastname;
      this.username = data.username;
      this.password = data.password;
      this.mobile = data.mobile;
   }

   addUser() {
      return `INSERT INTO users(firstname, lastname, username, password, mobile) \
                   VALUES('${this.firstname}','${this.lastname}', '${this.username}', '${this.password}', '${this.mobile}')`;
   }

   updateUser(id) {
      return `UPDATE users SET firstname = '${this.firstname}', lastname = '${this.lastname}', username = '${this.username}', password = '${this.password}', mobile = '${this.mobile}' WHERE id = ${id}`;
   }

   static getUserById(id) {
      return `SELECT * FROM users WHERE id = ${id}`;
   }

   static deleteUserById(id) {
      return `DELETE FROM users WHERE id = ${id}`;
   }

   static getAllUsers() {
      return `SELECT * FROM users`;
   }

   static getUserByUserName(username) {
      return  `SELECT * FROM users WHERE username = '${username}'`;
   }
}

module.exports = User;