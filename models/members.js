// const mysql = require('mysql');
require('dotenv').config();
const connection = require('../mysql');

connection.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log('connected');
  }
});

class ModelMembers {
  static Register(username, password) {
    // const query = `INSERT INTO member (id, password, name, address, phone_number) VALUES (?,?,?,?,?)`;
    // const values = [uuidv4(), data.password, data.name, data.address, data.phone_number];
    // console.log(data);

    const query = `INSERT INTO member (username, password) VALUES (?,?)`;
    const values = [username, password];

    connection.query(query, values, (err, result) => {
      if (err) {
        throw err;
      } else {
        console.log(result);
      }
    });
    // return data;
  }

  static GetAllMembers() {
    // const query = 'select * from merchant_test';
    const query = 'select * from member';
    return new Promise((resolve, reject) => {
      connection.query(query, (err, result) => {
        // if (err) {
        //   throw err;
        // } else {
        //   resolve(result);
        // }
        try {
          if (err) {
            throw err;
          } else {
            // console.log(result);
            resolve(result);
          }
        } catch (err) {
          console.log(err.message);
        }
      });
    });
  }

  static GetMember(id) {
    const query = `select * from member where id = ${id}`;
    return new Promise((resolve, reject) => {
      connection.query(query, (err, result) => {
        if (err) {
          throw err;
        } else {
          resolve(result);
        }
      });
    });
  }

  static CheckUser(username) {
    const query = `select * from member where username = "${username}"`;
    //    console.log(query);
    // connection.query(query, (err, result) => {
    //   if (err) {
    //     throw err;
    //   } else {
    //     console.log(result);
    //   }
    // });
    return new Promise((resolve, reject) => {
      connection.query(query, (err, result) => {
        if (err) {
          throw err;
        } else {
          resolve(result);
          // console.log(result);
        }
      });
    });
  }

  static async CheckPassword(username, password) {
    const query = `select * from member where username = "${username}" and password="${password}";`;
    return new Promise((resolve, reject) => {
      connection.query(query, (err, result) => {
        if (err) {
          throw err;
        } else {
          console.log(result);
          resolve(result);
        }
      });
    });
  }

  static GetNote(id) {
    const query = `select * from note where member_id=${id};`
    return new Promise((resolve, reject) => {
      connection.query(query, (err, result) => {
        if (err) {
          throw err;
        } else {
          resolve(result);
        }
      });
    });
  }

  static CreateNote(data, id) {
    const query = `INSERT INTO note (title, content, member_id) VALUES (?,?,?)`;
    const values = [data.title, data.content, id];

    connection.query(query, values, (err, result) => {
      try {
        if (err) {
          throw err;
        } else {
          console.log(result);
        }
      } catch (err) {
        console.log(err.message);
      }
    });
  }

  static EditNote(data, id) {
    const query = `UPDATE note SET title = ?, content = ? WHERE id = ?`;
    const values = [data.title, data.content, id];

    connection.query(query, values, (err, result) => {
      try {
        if (err) {
          throw err;
        } else {
          console.log(result);
        }
      } catch (err) {
        console.log(err.message);
      }
    });
  }

  static DeleteNote(id) {
    const query = `delete from note where id = ${id}`;
    
    connection.query(query, (err, result) => {
      try {
        if (err) {
          throw err;
        } else {
          console.log(result);
        }
      } catch (err) {
        console.log(err.message);
      }
    });
  }
}

module.exports = ModelMembers;
