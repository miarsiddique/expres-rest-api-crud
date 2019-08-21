const db = require('../../migration');
const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
   login: (req, res, nex) => {
      db.query(User.getUserByUserName(req.body.username), (err, results) => {
         if(err) {
            res.status(404).json({
               'errors': err.message,
            });
         }

         if(results.length <= 0) {
            res.status(401).json({
               'errors': {
                  message: 'Username & password wrong!',
               }
            })
         }else {
            var user = results[0];
            bcrypt.compare(req.body.password, user.password, (err, result) =>{
               if(err) {
                  res.status(401).json({
                     'errors': err.message,
                  });
               }
               if (result) {
                  const token = jwt.sign(
                     {
                        user: user
                     },
                     'secret',
                     {
                        expiresIn: "1h"
                     }
                  );

                  return res.status(200).json({
                     message: 'Auth successfully.',
                     'data': {
                        id: user.id,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        username: user.username,
                        mobile: user.mobile,
                        token: token
                     },
                  });

               } else {
                  return res.status(401).json({
                     'errors': {
                        message: 'Username & password wrong!',
                     }
                  })
               }
            });
         }
      });
   }
}