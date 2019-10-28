const express = require('express');
const router = express.Router();
const db = require('../models');
const { User } = db;


// router.get('/', (req,res) => {
//   User.findAll({})
//     .then(users => res.json(users));
// });

function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}

router.post('/', (req, res) => {
    User.findAll({
        where: {
        email: req.body.email
      }
    }).then (user => {
      console.log(user);
    if(isEmptyObject(user)){ 
      User.create({email: req.body.email, password: req.body.password})
        .then(user => {
          res.status(201).json(user);
        })
        .catch(err => {
          res.status(400).json(err);
        });
    }
    else {
      res.status(400).json("Account Exists");
    }
    });

});

router.post('/users', (req, res) => {
    User.findAll({
        where: {
        email: req.body.email,
        password: req.body.password,
      }
    }).then(user => {
      if(!isEmptyObject(user)){
          res.status(201).json(user);
        }
      else{
         res.status(404).json("Account Not Found");
      }
});
  });


router.get('/:id', (req, res) => {
  const { id } = req.params;
  User.findByPk(id)
    .then(user => {
      if(!user) {
        return res.sendStatus(404);
      }

      res.json(post);
    });
});




// router.put('/:id', (req, res) => {
//   const { id } = req.params;
//   User.findByPk(id)
//     .then(user => {
//       if(!user) {
//         return res.sendStatus(404);
//       }

//       user.email = req.body.email;
//       user.email = req.body.password;
//       user.save()
//         .then(user => {
//           res.json(user);
//         })
//         .catch(err => {
//           res.status(400).json(err);
//         });
//     });
// });


// router.delete('/:id', (req, res) => {
//   const { id } = req.params;
//   User.findByPk(id)
//     .then(user => {
//       if(!user) {
//         return res.sendStatus(404);
//       }

//       user.destroy();
//       res.sendStatus(204);
//     });
// });


module.exports = router;