require('dotenv').config();
const ModelMembers = require('../models/members');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class ControllerMembers {
  static async Register(req, res) {
    // const username = req.body.username;
    // const password = req.body.password;
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    // ModelMembers.Register(username, hashedPassword);
    ModelMembers.CheckUser(username).then((result) => {
      if (result.length) {
        res.json({ isExist: true });
        return;
      } else {
        ModelMembers.Register(username, hashedPassword);
        res.status(201).json('register success');
      }
    });
  }

  static GetAllMembers(req, res) {
    ModelMembers.GetAllMembers().then((result) => {
      console.log(result);
      res.status(200).json(result);
    });
  }

  static GetMember(req, res) {
    ModelMembers.GetMember(req.params.id).then((result) => {
      console.log(result);
      res.status(200).json(result);
    });
  }

  static Login(req, res) {
    //   ModelMembers.Login(req.body)
    ModelMembers.CheckUser(req.body.username).then(async (result) => {
      if (result.length) {
        if (await bcrypt.compare(req.body.password, result[0].password)) {
          const user = {
            name: req.body.username,
            id: result[0].id,
          };
          const accessToken = jwt.sign(user, process.env.SECRET_KEY , { expiresIn: '15m' });
          res.status(200).json({ accessToken, result: result[0] });
        } else {
          res.status(401).send('incorrect password');
        }
      } else {
        res.status(404).send('user not found');
      }
    });
  }

  static GetNote(req, res) {
    // req.params.userId = 2
    ModelMembers.GetNote(req.params.userId).then((result) => {
      res.status(200).json(result);
    });
  }

  static CreateNote(req, res) {
    console.log(req.body.title, req.body.content, req.params.userId);
    ModelMembers.CreateNote(req.body, req.params.userId);
  }

  static EditNote(req, res) {
    req.params.noteId = req.body.id;
    console.log(req.body, req.params.userId, req.params.noteId);
    ModelMembers.EditNote(req.body, req.params.noteId)
  }

  static DeleteNote(req, res) {
    // req.params.noteId = req.body.id;
    // console.log(req.params.noteId);
    console.log(req.params.noteId);
    ModelMembers.DeleteNote(req.params.noteId);
  }
}

module.exports = ControllerMembers;
