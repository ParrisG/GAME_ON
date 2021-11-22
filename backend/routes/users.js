const express = require('express');
const router = express.Router();


const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = ({
  getUsers,
  getUserByEmail,
  getUserByEmailAndPasword,
  addUser
}) => {
  /* GET users listing. */
  router.get('/', (req, res) => {
      getUsers()
          .then((users) => res.json(users))
          .catch((err) => res.json({
              error: err.message
          }));
  });


  router.post('/register', (req, res) => {

      const {
          first_name,
          last_name,
          email,
          password
      } = req.body;
      
      // const first_name = 'user';
      // const last_name = 'userlast';
      // const email = 'first@gmail.com';
      // const password = 'test';

      getUserByEmail(email)
          .then(user => {

              if (user) {
                //console.log('User exist', user);
                  res.json({
                      msg: 'Sorry, a user account with this email already exists'
                  });
              } else {
                //console.log('id available****', email);
                  return addUser(first_name, last_name, email, password)
              }

          })
          .then(newUser => res.json(newUser))
          .catch(err => res.json({
              error: err.message
          }));

  })

  router.post('/login', (req, res) => {
    const {
        email,
        password
    } = req.body;
    // const email = 'wrong@example.com';
    // const password = 'test';

    console.log('Email: ', email);
    console.log('password: ', password);

    getUserByEmailAndPasword(email, password)
        .then(user => {

          if (!user) {
            //console.log('credentials ***', user);
              res.json({
                  msg: 'Sorry, wrong credentials'
              });
          } else {
            //console.log('here in else', user);
            res.json(user);
          }

      })
      .catch(err => res.json({
          error: err.message
      }));
          
    });


  return router;
};
