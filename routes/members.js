require('dotenv').config();
const express = require('express');
const router = express.Router();
const ControllerMembers = require('../controllers/members');
const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    req.params.userId = req.user.id;
    next();
  });
  // Bearer TOKEN
};

router.post('/register', ControllerMembers.Register);
router.get('/all-members', ControllerMembers.GetAllMembers);
router.get('/:id', ControllerMembers.GetMember);
router.post('/login', ControllerMembers.Login);

router.get(
  '/get-note/:userId',
  (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
      return res.sendStatus(401);
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      req.params.userId = req.user.id;
      next();
    });
    // Bearer TOKEN
  },
  ControllerMembers.GetNote
);
// router.get('/get-note/:id', authenticateUser, ControllerMembers.GetNote);
router.post(
  '/create-note/:userId',
  (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
      return res.sendStatus(401);
    }
    console.log(token);
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      console.log(user);
      req.params.userId = req.user.id;
      next();
    });
    // Bearer TOKEN
  },
  ControllerMembers.CreateNote
);

router.put(
  '/edit-note/:userId/:noteId',
  (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
      return res.sendStatus(401);
    }
    console.log(token);
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      console.log(user);
      req.params.userId = req.user.id;
      next();
    });
    // Bearer TOKEN
  },
  ControllerMembers.EditNote
);

router.delete(
  '/delete-note/:noteId',
  (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);

    if (token == null) {
      return res.sendStatus(401);
    }
    
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      console.log(user);
      next();
    });
    // Bearer TOKEN
  },
  ControllerMembers.DeleteNote
);

module.exports = router;

// (req, res, next) => {
//   console.log(req.cookies['token']);

//   const validate = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
//   console.log(validate);
//   if (validate) {
//   req.params.id = validate.id

//   // console.log(req.params.id);
//     next();
//   } else {
//     res.status(401);
//   }
// },
