const db = require('../../migration');
const User = require('../Models/User');

module.exports = {

   /**
    * store user details.
    */
   userStore: (req, res, next) => {
      const userData = {
         firstname: req.body.firstname,
         lastname: req.body.lastname,
         username: req.body.username,
         password: req.body.password,
         mobile: req.body.mobile,
      }
      const user = new User(userData);

      db.query(user.addUser(), (err, result) => {
         if (err) {
            res.status(400).json({
               'error': err.message,
               'error_line': err.files,
            })
         };

         db.query(User.getUserById(result.insertId), (err, userData) => {
            console.log(userData[0]);
            res.status(200).json({
               'data': userData[0],
            });
         })
      });
   },

   /**
    * Get the lists of all users.
    */
   usersLists: (req, res, next) => {
      db.query(User.getAllUsers(), (err, result) => {
         if (err) {
            res.status(400).json({
               'error': err.message,
            })
         }

         res.status(200).json({
            'data': result,
         });
      })
   },

   /**
    * Update user details.
    */
   updateUser: (req, res, next) => {
      const userData = {
         firstname: req.body.firstname,
         lastname: req.body.lastname,
         username: req.body.username,
         password: req.body.password,
         mobile: req.body.mobile,
      }

      const user = new User(userData);
      const id = req.params.id;
      db.query(user.updateUser(id), (err, result) => {
         if(err) {
            res.status(400).json({
               'error': err.message,
            });
         }

         db.query(User.getUserById(id), (err, userData) => {

            if (err) {
               res.status(400).json({
                  'error': err.message,
               });
            }

            res.status(200).json({
               'message': 'User updated successfully.',
               'data': userData[0],
            });
         });
      });
   },
   /**
    * get user details by user id.
    */
   getUserById: (req, res, next) => {
      const id = req.params.id;
      db.query(User.getUserById(id), (err, result) => {
         if(err) {
            res.status(404).json({
               'error': err.message,
            });
         }

         res.status(200).json({
            'data': result[0],
         });
      })
   },

   deleteUser: (req, res, next) => {
      const id = req.params.id;
      db.query(User.deleteUserById(id), (err, result) => {
         if (err) {
            res.status(404).json({
               'error': err.message,
            });
         }

         res.status(200).json({
            'message': 'User deleted successfully.',
         });
      })
   }
}