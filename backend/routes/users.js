const express = require('express');
const router = express.Router();
const app = require('../app');
const jwt = require('jsonwebtoken');
//const bcrypt = require('bcryptjs');


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

      getUserByEmail(email)
          .then(user => {

              if (user) {
                  res.json({
                      msg: 'Sorry, a user account with this email already exists'
                  });
              } else {
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
   

    getUserByEmailAndPasword(email, password)
        .then(user => {
          if (!user) {
              res.json({
                  msg: 'Sorry, wrong credentials'
              });
          } else {
            const token = jwt.sign(
              {
                name: user.first_name,
                email: user.email,
              },
              'secret123'
            );
        
            return res.json({ status: 'ok', user: token })
          }

      })
      .catch(err => res.json({
          //error: err.message
           status: 'error', user: false
      }));
          
    });


  return router;
};
